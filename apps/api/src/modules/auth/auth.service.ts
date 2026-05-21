import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import type { AuthResponse } from './types';
import { SignupDto, LoginDto } from './dto';
import { UsersRepository } from '../users/users.repository';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { User } from '../users/types';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

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
      createdOn: newDate,
      updatedOn: newDate,
    };
    const createdUser = await this.usersRepository.createOrReplace(newUser);
    // Generate JWT accessToken
    const accessToken = this.jwtService.sign(
      { sub: createdUser.id, email: createdUser.email },
      { expiresIn: '30m', secret: process.env.JWT_SECRET },
    );
    // Generate refreshToken
    const refreshToken = crypto.randomBytes(32).toString('hex');
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    // Save hash, userId, expiresAt into refresh_tokens table
    // Set refreshToken as httpOnly, Secure, SameSite=Strict, maxAge 7 days as response.cookie

    return { user: createdUser, accessToken, refreshToken: hashedRefreshToken };
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
      console.log(
        `Incorrect password ${loginData.password} for user with email ${loginData.email}.`,
      );
      throw new UnauthorizedException(
        `Provided user email or password is incorrect.`,
      );
    }
    // Generate JWT accessToken
    const accessToken = this.jwtService.sign(
      {
        sub: foundUser.id,
        email: foundUser.email,
      },
      {
        expiresIn: '30m',
        secret: process.env.JWT_SECRET,
      },
    );
    // Generate refreshToken
    const refreshToken = crypto.randomBytes(32).toString('hex');
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    // Save hash, userId, expiresAt into refresh_tokens table
    // Set refreshToken as httpOnly, Secure, SameSite=Strict, maxAge 7 days as response.cookie
    // already logged in?

    return { user: foundUser, accessToken, refreshToken: hashedRefreshToken };
  }

  // POST logout. Gets id from JWT payload
  async logout(id: string): Promise<{ message: string }> {
    // get id from JWT payload
    // remove refreshToken row from table where id matches

    console.log(`User with id ${id} logged out successfully.`);
    return { message: `User with id ${id} logged out successfully.` };
  }

  // async delete(id: string): Promise<{ message: string }> {
  //   console.log(`User data for id ${id} deleted successfully`);
  //   return { message: `User data for id ${id} deleted successfully` };
  // }
}
