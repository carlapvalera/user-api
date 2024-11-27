// src/main.ts

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { WinstonModule } from 'nest-winston';
import { loggerConfig } from './users/core/logger.config'; // Importa la configuración del logger

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger(loggerConfig), // Usa la configuración del logger aquí
  });

  // Configura el ValidationPipe globalmente
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
    stopAtFirstError: true,
  }));

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('User API')
    .setDescription('API para gestionar usuarios')
    .setVersion('1.0')
    .addTag('users')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document); // Asegúrate de que esta línea esté presente

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();