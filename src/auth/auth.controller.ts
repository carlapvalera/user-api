import { Controller, Post, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
   constructor(private readonly authService: AuthService) {}

   @Post('login')
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