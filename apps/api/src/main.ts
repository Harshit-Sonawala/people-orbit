import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const PORT = configService.get<number>('PORT') || 4000;
  
  app.enableCors({
    origin: "http://localhost:3000",
  });
  app.setGlobalPrefix('api'); // routes become /api/people...

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app.listen(PORT);
  console.log(`Nestjs app running on http://localhost:${PORT}`);
}
bootstrap();
