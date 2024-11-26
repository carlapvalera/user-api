import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  // Manejo de errores al conectar a MongoDB
  try {
    await app.init(); // Inicializa la aplicación
    console.log('Conexión a MongoDB establecida exitosamente.');
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error);
  }



  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

