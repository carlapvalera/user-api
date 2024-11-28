import { Controller, Post, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('auth')

@Controller('auth')
export class AuthController {
   constructor(private readonly authService: AuthService) {}

   @Post('login')
   @ApiOperation({ summary: 'Iniciar sesión' }) // Descripción del endpoint
   @ApiResponse({ status: 200, description: 'Inicio de sesión exitoso.' }) // Respuesta exitosa
   @ApiResponse({ status: 401, description: 'Credenciales inválidas.' }) // Respuesta en caso de error
   @ApiBody({
    
    description: 'Credenciales del usuario para iniciar sesión',
})
   async login(@Body() body, @Res() res: Response) {
       const user = await this.authService.validateUser(body.email, body.password);
       if (!user) {
           return res.status(401).send('Invalid credentials');
       }
       const token = await this.authService.login(user);
       
       // Establecer la cookie con el token JWT
       res.cookie('jwt', token.access_token, { httpOnly: true });
       
       return res.send({ message: 'Login successful' });
   }
}