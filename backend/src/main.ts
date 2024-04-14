import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ErrorInterceptor } from './interceptors/error.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Añadir de forma global el pipe de validación
  app.useGlobalPipes(new ValidationPipe());

  // Añadir de forma global el interceptor de los errores
  app.useGlobalInterceptors(new ErrorInterceptor());

  app.enableCors({
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST'],
    credentials: true,
  });

  await app.listen(3000);
}
bootstrap();
