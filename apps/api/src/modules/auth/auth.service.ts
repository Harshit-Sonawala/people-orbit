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
    private readonly usersRepository: UsersRepository,
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

  // Create a new row in auth_sessions
  private async createSession(
    userId: string,
    hashedRefreshToken: string,
  ): Promise<void> {
    const newDate = Date.now();
    await this.authSessionsRepository.create({
      id: `session-${newDate}`,
      userId,
      refreshTokenHash: hashedRefreshToken,
      expiresAt: newDate + 7 * 24 * 60 * 60 * 1000,
    });
  }

  // Find matching session in auth_sessions for specific userId + refreshToken
  private async findMatchingSession(
    userId: string,
    refreshToken: string,
  ): Promise<AuthSessionsEntity> {
    // find all sessions for userId
    const sessions = await this.authSessionsRepository.findAllByUserId(userId);
    // find which of those sessions matches the current refreshToken by hashing it again
    let matchedSession: AuthSessionsEntity | null = null;
    for (const session of sessions) {
      const isMatch = await bcrypt.compare(
        refreshToken,
        session.refreshTokenHash,
      );
      if (isMatch) {
        matchedSession = session;
        break;
      }
    }
    if (!matchedSession) {
      throw new UnauthorizedException('Invalid refresh token.');
    }
    return matchedSession;
  }

  // POST signup
  async signup(signupData: SignupDto): Promise<AuthResponse> {
    const foundUser = await this.usersRepository.findOne({
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
    const createdUser = await this.usersRepository.createOrReplace(newUser);

    const accessToken = this.generateAccessToken(createdUser); // Generate JWT accessToken
    const { refreshToken, hashedRefreshToken } =
      await this.generateRefreshToken(); // Generate refreshToken

    // Save id, hash, userId, expiresAt into sessions table
    await this.createSession(idSlug, hashedRefreshToken);

    return { id: createdUser.id, accessToken, refreshToken };
  }

  // POST login
  async login(loginData: LoginDto): Promise<AuthResponse> {
    const foundUser = await this.usersRepository.findOneAndGetPassword(
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
    await this.createSession(foundUser.id, hashedRefreshToken);

    return { id: foundUser.id, accessToken, refreshToken };
  }

  // POST logout. Gets userId from JWT payload
  async logout(
    userId: string,
    refreshToken: string,
  ): Promise<{ message: string }> {
    const matchedSession = await this.findMatchingSession(userId, refreshToken);

    await this.authSessionsRepository.deleteOne(matchedSession.id);

    return {
      message: `User with id: ${userId}, sessionId: ${matchedSession.id} logged out successfully.`,
    };
  }

  // GET user automatically on load based on accessToken
  async getMe(userId: string): Promise<User> {
    const foundUser = await this.usersRepository.findOne({ id: userId });
    if (!foundUser) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    return foundUser;
  }

  // Refresh token
  async refresh(
    expiredAccessToken: string,
    refreshToken: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    if (!expiredAccessToken || !refreshToken) {
      throw new UnauthorizedException('Missing Access Token or Refresh Token.');
    }

    // Decode to get userId
    const payload = this.jwtService.decode(expiredAccessToken) as {
      sub: string;
    } | null;
    if (!payload?.sub) {
      throw new UnauthorizedException('Invalid Access token.');
    }
    const userId = payload.sub;

    const matchedSession = await this.findMatchingSession(userId, refreshToken);

    // 7 Day Expiry Passed, Delete row from auth_sessions DB and prompt a login
    if (matchedSession.expiresAt < Date.now()) {
      await this.authSessionsRepository.deleteOne(matchedSession.id);
      throw new UnauthorizedException('Session expired. Please log in again.');
    }

    // Prevent generating token for a non-existent user
    const user = await this.usersRepository.findOne({ id: userId });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    // Rotate: delete old session and create new session
    await this.authSessionsRepository.deleteOne(matchedSession.id);

    const newAccessToken = this.generateAccessToken(user);
    const {
      refreshToken: newRefreshToken,
      hashedRefreshToken: newHashedRefreshToken,
    } = await this.generateRefreshToken();

    await this.createSession(userId, newHashedRefreshToken);

    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  }
}
