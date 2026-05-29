import {
  Controller,
  UseGuards,
  Get,
  Post,
  Body,
  Req,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResponse, type JwtPayload } from './types';
import { User } from '../users/types';
import { SignupDto, LoginDto } from './dto';
import { IsAuthenticated } from '@/common/guards/is-authenticated.guard';
import { CurrentUser } from '@/common/decorators/current-user.decorator';

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
  async logout(@CurrentUser() user: JwtPayload): Promise<{ message: string }> {
    return this.authService.logout(user.sub); // Get user id from JWT
  }

  @Get('me')
  @UseGuards(IsAuthenticated)
  async getMe(@CurrentUser() user: JwtPayload): Promise<User> {
    return this.authService.getMe(user.sub);
  }
}
