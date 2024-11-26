import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

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



  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

