import { Controller, UseGuards, Post, Param, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResponse } from './types';
import { SignupDto, LoginDto } from './dto';
import { IsAuthenticated } from '@/common/guards/is-authenticated.guard';

@Controller('auth') // /api/auth
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() signupDto: SignupDto): Promise<AuthResponse> {
    return this.authService.signup(signupDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<AuthResponse> {
    return this.authService.login(loginDto);
  }

  @Post('logout/:id')
  @UseGuards(IsAuthenticated)
  async logout(@Param('id') id: string): Promise<{ message: string }> {
    return this.authService.logout(id);
  }
}
