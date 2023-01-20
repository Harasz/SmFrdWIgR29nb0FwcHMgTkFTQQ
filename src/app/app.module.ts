import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NasaApodProvider } from '../providers';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), NasaApodProvider],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
