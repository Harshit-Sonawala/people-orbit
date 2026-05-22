import { Controller, UseGuards, Post, Body, Req } from '@nestjs/common';
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

  @Post('logout')
  @UseGuards(IsAuthenticated)
  async logout(@Req() req: Request): Promise<{ message: string }> {
    const userId = req['user'].sub; // Get user id from JWT
    return this.authService.logout(userId);
  }
}
