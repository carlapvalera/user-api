// src/users/dto/create-user.dto.ts

import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  
   @ApiProperty({ description: 'Nombre de usuario' }) // Descripción del campo
   @IsString()
   @IsNotEmpty()
   username: string;

   @ApiProperty({ description: 'Correo electrónico del usuario' }) // Descripción del campo
   @IsEmail()
   email: string;

   @ApiProperty({ description: 'Contraseña del usuario' }) // Descripción del campo
   @IsString()
   @IsNotEmpty()
   password: string;
}