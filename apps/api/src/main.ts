import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const PORT = configService.get<number>('PORT', 4000);
  const FRONTEND_URL = configService.get<string>('FRONTEND_URL', 'http://localhost:3000');

  app.enableCors({
    origin: FRONTEND_URL,
  });
  app.setGlobalPrefix('api'); // routes become /api/users...

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true, }));

  await app.listen(PORT);
  console.log(`PeopleOrbit API listening on http://localhost:${PORT}`);
}
bootstrap();
