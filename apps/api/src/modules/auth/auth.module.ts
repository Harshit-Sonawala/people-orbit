import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthSessionsEntity } from './auth-sessions.entity';
import { AuthSessionsRepository } from './auth-sessions.repository';
import { UsersEntity } from '@/modules/users/users.entity';
import { UsersRepository } from '@/modules/users/users.repository';

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
