// src/auth/jwt.strategy.ts

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
   constructor(private usersService: UsersService) {
     super({
       jwtFromRequest: ExtractJwt.fromExtractors([(req) => req?.cookies?.jwt]), // Extrae el token desde las cookies
       ignoreExpiration: false,
       secretOrKey: 'your_secret_key', // Usa la misma clave que configuraste en el módulo de autenticación
     });
   }

   async validate(payload: any) {
     return this.usersService.findOne(payload.sub); // Retorna el usuario encontrado por su ID (sub)
   }
}