// src/users/dto/update-user.dto.ts

import { IsEmail, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  
  @ApiProperty({ description: 'Nombre de usuario (opcional)', required: false }) // Descripción del campo
  @IsOptional()
  @IsString()
  username?: string;

  @ApiProperty({ description: 'Correo electrónico del usuario (opcional)', required: false }) // Descripción del campo
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ description: 'Contraseña del usuario (opcional)', required: false }) // Descripción del campo
  @IsOptional()
  @IsString()
  password?: string;
}