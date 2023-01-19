import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { HttpExceptionFilter } from './core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1. Enable global pipes
  app.useGlobalPipes(new ValidationPipe());

  // 2. Enable global filters
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(3000);
}
bootstrap();
