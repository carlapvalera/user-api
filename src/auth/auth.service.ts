import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
   constructor(private usersService: UsersService, private jwtService: JwtService) {}

   async validateUser(email: string, password: string): Promise<any> {
       const user = await this.usersService.validateUser(email, password);
       if (user) {
           return user; 
       }
       return null; 
   }

   async login(user: any) {
       const payload = { username: user.username, sub: user._id };
       return {
           access_token: this.jwtService.sign(payload),
       };
   }
}