import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('app')

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  
  @Get()
  @ApiOperation({ summary: 'Obtener saludo' }) 
  @ApiResponse({ status: 200, description: 'Saludo exitoso.' }) 
  getHello(): string {
    return this.appService.getHello()
  }
  @Get('test-connection')
  @ApiOperation({ summary: 'Probar conexión a MongoDB' }) 
  @ApiResponse({ status: 200, description: 'Conexión a MongoDB exitosa!' }) 
  getConnectionTest(): string {
    return 'Conexión a MongoDB exitosa!';
  }
}

