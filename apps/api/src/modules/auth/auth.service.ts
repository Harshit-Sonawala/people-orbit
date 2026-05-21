import { Injectable, ConflictException } from '@nestjs/common';
import type { AuthResponse } from './types';
import { SignupDto, LoginDto } from './dto';
import { UsersRepository } from '../users/users.repository';
import bcrypt from 'bcrypt';
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

    if (foundUser) {
      throw new ConflictException(
        `User with email ${signupData.email} already exists`,
      );
    }

    const newDate: number = Date.now();
    const idSlug: string = `${signupData.firstName.toLowerCase().replace(/\s+/g, '-')}-${signupData.lastName.toLowerCase().replace(/\s+/g, '-')}-${newDate}`;
    // hash password plaintext
    const hashedPassword = await bcrypt.hash(signupData.password, 10);

    const newUser: User = {
      ...signupData,
      id: idSlug,
      password: hashedPassword,
      createdOn: newDate,
      updatedOn: newDate,
    };
    // repository create a new user record
    const createdUser = await this.usersRepository.createOrReplace(newUser);

    // Generate JWT access token
    const accessToken = this.jwtService.sign(
      { sub: createdUser.id, email: createdUser.email },
      { expiresIn: '1h', secret: process.env.JWT_SECRET },
    );

    // TODO: Generate refresh token
    return { user: createdUser, accessToken };
  }

  // POST login
  async login(loginData: LoginDto): Promise<AuthResponse> {
    return {};
  }

  // async logout()
}
