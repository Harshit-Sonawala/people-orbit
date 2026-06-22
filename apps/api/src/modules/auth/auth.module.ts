import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { RefreshTokensEntity } from './auth-refresh-tokens.entity';
import { RefreshTokensRepository } from './auth-refresh-tokens.repository';
import { UsersEntity } from '@/modules/users/users.entity';
import { UsersRepository } from '@/modules/users/users.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([RefreshTokensEntity, UsersEntity]),
    JwtModule.registerAsync({
      global: true,
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '30m' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, RefreshTokensRepository, UsersRepository],
})
export class AuthModule {}
