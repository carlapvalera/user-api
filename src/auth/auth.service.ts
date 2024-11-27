import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UserInterface } from '../users/user.interface'; // Importa la interfaz

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    
    return this.usersService.create({
      username: registerDto.username,
      email: registerDto.email,
      password: hashedPassword,
    });
  }

  async login(loginDto: LoginDto) {
    const user: UserInterface | null = await this.usersService.findOneByEmail(loginDto.email);
    
    if (!user || !(await bcrypt.compare(loginDto.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { email: user.email, sub: user.username }; // Usa username o email como sub
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}