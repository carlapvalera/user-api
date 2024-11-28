import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../users/users.service';
import * as dotenv from 'dotenv';

dotenv.config();
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
   constructor(private usersService: UsersService) {
     super({
       jwtFromRequest: ExtractJwt.fromExtractors([(req) => req?.cookies?.jwt]), 
       ignoreExpiration: false,
       secretOrKey: process.env.JWT_SECRET || 'default_secret_key', // Usa la misma clave que configuraste en el módulo de autenticación
     });
   }

   async validate(payload: any) {
     return this.usersService.findOne(payload.sub); 
   }
}