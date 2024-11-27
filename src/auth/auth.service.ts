// src/auth/auth.service.ts

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
   constructor(private usersService: UsersService, private jwtService: JwtService) {}

   async validateUser(email: string, password: string): Promise<any> {
       const user = await this.usersService.validateUser(email, password);
       if (user) {
           return user; // Retorna el usuario si es válido
       }
       return null; // Retorna null si no es válido
   }

   async login(user: any) {
       const payload = { username: user.username, sub: user._id };
       return {
           access_token: this.jwtService.sign(payload),
       };
   }
}