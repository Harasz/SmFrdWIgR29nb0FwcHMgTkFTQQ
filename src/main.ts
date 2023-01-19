import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { AppConfig } from './config';
import { HttpExceptionFilter } from './core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const appConfig = new AppConfig(configService);

  // 1. Enable global pipes
  app.useGlobalPipes(new ValidationPipe());

  // 2. Enable global filters
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(appConfig.appPort);
  Logger.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
