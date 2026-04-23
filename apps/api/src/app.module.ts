import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PeopleModule } from './modules/people/people.module';

@Module({
  imports: [PeopleModule, ConfigModule.forRoot({isGlobal: true,})],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
