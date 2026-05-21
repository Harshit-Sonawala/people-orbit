import { Injectable } from '@nestjs/common';
import type { AuthResponse } from './types';
import { SignupDto, LoginDto } from './dto';
import { UsersRepository } from '../users/users.repository';

@Injectable()
export class AuthService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async signup(signupData: SignupDto): Promise<AuthResponse> {
    return {};
  }

  async login(loginData: LoginDto): Promise<AuthResponse> {
    return {};
  }

  // async logout()
}
