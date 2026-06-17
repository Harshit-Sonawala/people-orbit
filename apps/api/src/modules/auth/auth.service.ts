import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import type { AuthResponse } from './types/auth-response.type';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { UsersRepository } from '@/modules/users/users.repository';
import { User } from '@/modules/users/types/user.type';
import { UserRole } from '@/modules/users/types/user-role.enum';
import { AuthSessionsRepository } from './auth-sessions.repository';
import { AuthSessionsEntity } from './auth-sessions.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersRepo: UsersRepository,
    private readonly authSessionsRepository: AuthSessionsRepository,
  ) {}

  private generateAccessToken(user: User): string {
    const accessToken = this.jwtService.sign({
      sub: user.id,
      email: user.email,
    });
    return accessToken;
  }

  private async generateRefreshToken(): Promise<{
    refreshToken: string;
    hashedRefreshToken: string;
  }> {
    const refreshToken = crypto.randomBytes(32).toString('hex');
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    return { refreshToken, hashedRefreshToken };
  }

  // Create a new row in auth_sessions and return the sessionId
  private async createSession(
    userId: string,
    hashedRefreshToken: string,
  ): Promise<string> {
    const newDate = Date.now();
    const sessionId = `session-${newDate}`;
    await this.authSessionsRepository.create({
      sessionId,
      userId,
      refreshTokenHash: hashedRefreshToken,
      expiresAt: newDate + 7 * 24 * 60 * 60 * 1000,
    });
    return sessionId;
  }

  // Find session by sessionId, then verify the refreshToken
  private async findMatchingSession(
    sessionId: string,
    refreshToken: string,
  ): Promise<AuthSessionsEntity> {
    const session = await this.authSessionsRepository.findOne({ sessionId });
    if (!session) {
      throw new UnauthorizedException('Invalid session.');
    }
    const isMatch = await bcrypt.compare(
      refreshToken,
      session.refreshTokenHash,
    );
    if (!isMatch) {
      throw new UnauthorizedException('Invalid refresh token.');
    }
    return session;
  }

  // POST signup
  async signup(signupData: SignupDto): Promise<AuthResponse> {
    const foundUser = await this.usersRepo.findOne({
      email: signupData.email,
    });
    // Already exists: throw 409 Conflict Error
    if (foundUser) {
      throw new ConflictException(
        `User with email ${signupData.email} already exists`,
      );
    }
    // Create a new user
    const newDate: number = Date.now();
    const idSlug: string = `${signupData.firstName.toLowerCase().replace(/\s+/g, '-')}-${signupData.lastName.toLowerCase().replace(/\s+/g, '-')}-${newDate}`;
    const hashedPassword = await bcrypt.hash(signupData.password, 10);
    const newUser: User = {
      ...signupData,
      id: idSlug,
      password: hashedPassword,
      role: UserRole.USER,
      createdAt: newDate,
      updatedAt: newDate,
      isBanned: false,
    };
    const createdUser = await this.usersRepo.createOrReplace(newUser);

    const accessToken = this.generateAccessToken(createdUser); // Generate JWT accessToken
    const { refreshToken, hashedRefreshToken } =
      await this.generateRefreshToken(); // Generate refreshToken

    // Save id, hash, userId, expiresAt into sessions table
    const sessionId = await this.createSession(idSlug, hashedRefreshToken);

    return { userId: createdUser.id, accessToken, refreshToken, sessionId };
  }

  // POST login
  async login(loginData: LoginDto): Promise<AuthResponse> {
    const foundUser = await this.usersRepo.findOneAndGetPassword(
      loginData.email,
    );

    // Email does not exist: throw 401 Unauthorized Error
    if (!foundUser) {
      console.log(`User with email ${loginData.email} not found.`);
      throw new UnauthorizedException(
        `Provided user email or password is incorrect.`,
      );
    }

    // Compare plaintext password with hash from table
    const isPassHashMatches = await bcrypt.compare(
      loginData.password,
      foundUser.password,
    );
    if (!isPassHashMatches) {
      throw new UnauthorizedException(
        `Provided user email or password is incorrect.`,
      );
    }
    const accessToken = this.generateAccessToken(foundUser); // Generate JWT accessToken
    const { refreshToken, hashedRefreshToken } =
      await this.generateRefreshToken(); // Generate refreshToken

    // Save id, hash, userId, expiresAt into sessions table
    const sessionId = await this.createSession(
      foundUser.id,
      hashedRefreshToken,
    );

    return { userId: foundUser.id, accessToken, refreshToken, sessionId };
  }

  // POST logout. Gets userId from JWT payload
  async logout(
    userId: string,
    refreshToken: string,
    sessionId: string,
  ): Promise<{ message: string }> {
    if (!refreshToken || !sessionId) {
      throw new UnauthorizedException('Refresh token or session not found.');
    }
    const matchedSession = await this.findMatchingSession(
      sessionId,
      refreshToken,
    );

    await this.authSessionsRepository.deleteOne(matchedSession.sessionId);

    return {
      message: `User with id: ${userId}, sessionId: ${matchedSession.sessionId} logged out successfully.`,
    };
  }

  // GET user automatically on load based on accessToken
  async getMe(userId: string): Promise<User> {
    const foundUser = await this.usersRepo.findOne({ id: userId });
    if (!foundUser) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    return foundUser;
  }

  // Refresh token
  async refresh(
    refreshToken: string,
    sessionId: string,
  ): Promise<{ accessToken: string; refreshToken: string; sessionId: string }> {
    if (!refreshToken || !sessionId) {
      throw new UnauthorizedException('Missing Refresh Token, or Session.');
    }

    const matchedSession = await this.findMatchingSession(
      sessionId,
      refreshToken,
    );

    // 7 Day Expiry Passed, Delete row from auth_sessions DB and prompt a login
    if (matchedSession.expiresAt < Date.now()) {
      await this.authSessionsRepository.deleteOne(matchedSession.sessionId);
      throw new UnauthorizedException('Session expired. Please log in again.');
    }

    // Prevent generating token for a non-existent user
    const user = await this.usersRepo.findOne({
      id: matchedSession.userId,
    });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    // Rotate: delete old session and create new session
    await this.authSessionsRepository.deleteOne(matchedSession.sessionId);

    const newAccessToken = this.generateAccessToken(user);
    const {
      refreshToken: newRefreshToken,
      hashedRefreshToken: newHashedRefreshToken,
    } = await this.generateRefreshToken();

    const newSessionId = await this.createSession(
      matchedSession.userId,
      newHashedRefreshToken,
    );

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
      sessionId: newSessionId,
    };
  }
}
