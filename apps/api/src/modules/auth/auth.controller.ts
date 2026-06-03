import { Controller, UseGuards, Get, Post, Body } from '@nestjs/common';
import { AuthService } from '@/modules/auth';
import { AuthResponse, type AuthJwtPayload } from '@/modules/auth/types';
import { SignupDto, LoginDto } from '@/modules/auth/dto';
import { User } from '@/modules/users/types';
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
  async logout(
    @CurrentUser() user: AuthJwtPayload,
  ): Promise<{ message: string }> {
    return this.authService.logout(user.sub); // Get user id from JWT
  }

  @Get('me')
  @UseGuards(IsAuthenticated)
  async getMe(@CurrentUser() user: AuthJwtPayload): Promise<User> {
    return this.authService.getMe(user.sub);
  }
}
