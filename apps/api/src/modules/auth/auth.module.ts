import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import {
  AuthController,
  AuthService,
  AuthSessionsEntity,
  AuthSessionsRepository,
} from './';
import { UsersEntity, UsersRepository } from '@/modules/users';

@Module({
  imports: [
    TypeOrmModule.forFeature([AuthSessionsEntity, UsersEntity]),
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
  providers: [AuthService, AuthSessionsRepository, UsersRepository],
})
export class AuthModule {}
