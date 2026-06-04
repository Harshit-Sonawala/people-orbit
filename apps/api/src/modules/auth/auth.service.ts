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
import { AuthSession } from './types/auth-session.type';
import { AuthSessionsRepository } from './auth-sessions.repository';

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

  private async generateRefreshToken(): Promise<string> {
    const refreshToken = crypto.randomBytes(32).toString('hex');
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    return hashedRefreshToken;
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
    const refreshToken = await this.generateRefreshToken(); // Generate refreshToken

    // Save id, hash, userId, expiresAt into sessions table
    const newAuthSession: AuthSession = {
      id: `session-${newDate}`,
      userId: idSlug,
      refreshTokenHash: refreshToken,
      expiresAt: newDate + 7 * 24 * 60 * 60 * 1000,
    };
    const createdAuthSession =
      await this.authSessionsRepository.create(newAuthSession);
    console.log(`createdAuthSession: ${JSON.stringify(createdAuthSession)}`);

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
    const refreshToken = await this.generateRefreshToken(); // Generate refreshToken

    // Save id, hash, userId, expiresAt into sessions table
    const newDate: number = Date.now();
    const newAuthSession: AuthSession = {
      id: `session-${newDate}`,
      userId: foundUser.id,
      refreshTokenHash: refreshToken,
      expiresAt: newDate + 7 * 24 * 60 * 60 * 1000,
    };
    const createdAuthSession =
      await this.authSessionsRepository.create(newAuthSession);
    console.log(`createdAuthSession: ${JSON.stringify(createdAuthSession)}`);

    // TODO: prevent already logged in mechanism / multiple logins policy

    return { id: foundUser.id, accessToken, refreshToken };
  }

  // POST logout. Gets id from JWT payload
  async logout(id: string): Promise<{ message: string }> {
    // remove refreshToken row from sessions table where id matches
    const deletedAuthSession = await this.authSessionsRepository.deleteOne(id);
    console.log(`deletedAuthSession: ${deletedAuthSession}`);

    return { message: `User with id ${id} logged out successfully.` };
  }

  // GET user automatically on load based on accessToken
  async getMe(id: string): Promise<User> {
    const foundUser = await this.usersRepository.findOne({ id: id });
    if (!foundUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return foundUser;
  }
}
