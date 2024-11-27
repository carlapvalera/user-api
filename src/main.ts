import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  // Manejo de errores al conectar a MongoDB
  try {
    await app.init(); // Inicializa la aplicación
    console.log('Conexión a MongoDB establecida exitosamente.');
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error);
  }

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
  SwaggerModule.setup('api-docs', app, document); // Accede a la documentación en /api-docs




  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

