import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';
import type { AuthResponse } from './types/auth-response.type';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { UsersRepository } from '@/modules/users/users.repository';
import { User } from '@/modules/users/types/user.type';
import { UserRole } from '@/modules/users/types/user-role.enum';
import { RefreshTokensRepository } from './auth-refresh-tokens.repository';
import { RefreshTokensEntity } from './auth-refresh-tokens.entity';
import { AuthJwtPayload } from './types';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersRepo: UsersRepository,
    private readonly RefreshTokensRepository: RefreshTokensRepository,
  ) {}

  private async generateAccessToken(user: User): Promise<string> {
    const accessToken = this.jwtService.signAsync({
      sub: user.id,
      email: user.email,
    });
    return accessToken;
  }

  private async generateRefreshToken(user: User): Promise<string> {
    const refreshToken = this.jwtService.signAsync(
      {
        sub: user.id,
        email: user.email,
      },
      { expiresIn: '7d' },
    );
    return refreshToken;
  }

  // Create a new row in refresh_tokens and return the id
  private async createRefreshTokensRow(userId: string, refreshToken: string) {
    const newDate = Date.now();
    const id = `refreshToken-${newDate}`;
    await this.RefreshTokensRepository.create({
      id,
      refreshToken,
    });
  }

  // Find refreshTokensRow based on refreshToken
  private async findMatchingRefreshTokensRow(
    refreshToken: string,
  ): Promise<RefreshTokensEntity> {
    const refreshTokensRow = await this.RefreshTokensRepository.findOne({
      refreshToken,
    });
    if (!refreshTokensRow) {
      throw new UnauthorizedException('No matching record found.');
    }
    return refreshTokensRow;
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

    const accessToken = await this.generateAccessToken(createdUser); // Generate JWT accessToken
    const refreshToken = await this.generateRefreshToken(createdUser); // Generate JWT refreshToken

    // Save id, refreshToken into refreshTokens table
    await this.createRefreshTokensRow(idSlug, refreshToken);

    return { userId: createdUser.id, accessToken, refreshToken };
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

    const accessToken = await this.generateAccessToken(foundUser); // Generate JWT accessToken
    const refreshToken = await this.generateRefreshToken(foundUser); // Generate refreshToken

    // Save id, refreshToken into refreshTokens table
    await this.createRefreshTokensRow(foundUser.id, refreshToken);

    return { userId: foundUser.id, accessToken, refreshToken };
  }

  // POST logout. Gets userId from JWT payload
  async logout(
    userId: string,
    refreshToken: string,
  ): Promise<{ message: string }> {
    if (!refreshToken) {
      throw new UnauthorizedException('Missing Refresh Token.');
    }
    const matchedRefreshTokensRow =
      await this.findMatchingRefreshTokensRow(refreshToken);
    await this.RefreshTokensRepository.deleteOne(matchedRefreshTokensRow.id);
    return {
      message: `User with id: ${userId} logged out successfully.`,
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

  // POST Refresh route returns new accessToken and refreshToken
  async refresh(
    refreshToken: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    if (!refreshToken) {
      throw new UnauthorizedException('Missing Refresh Token.');
    }
    // Verify token exists in DB, prevent reuse of revoked tokens
    const matchedRefreshTokenRow =
      await this.findMatchingRefreshTokensRow(refreshToken);

    // Decode and verify refreshToken JWT
    let payload: AuthJwtPayload;
    try {
      payload = await this.jwtService.verifyAsync(refreshToken);
    } catch (error) {
      // Clean up expired/invalid refreshTokensRow from DB
      await this.RefreshTokensRepository.deleteOne(matchedRefreshTokenRow.id);
      throw new UnauthorizedException(
        'RefreshTokensRow expired. Please log in again.',
      );
    }

    const userId = payload.sub;

    // Prevent generating token for a non-existent user
    const user = await this.usersRepo.findOne({
      id: userId,
    });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    // Rotate: delete old refreshTokensRow and create new refreshTokensRow
    await this.RefreshTokensRepository.deleteOne(matchedRefreshTokenRow.id);

    const newAccessToken = await this.generateAccessToken(user);
    const newRefreshToken = await this.generateRefreshToken(user);

    await this.createRefreshTokensRow(userId, newRefreshToken);

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  }
}
