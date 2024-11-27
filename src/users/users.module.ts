// src/users/users.module.ts

import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user.schema';
import { UsersGateway } from './users.gateway';
import { CoreModule } from './core/core.module'; // Importar el módulo del logger
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    CoreModule, // Asegúrate de incluirlo aquí
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersGateway],
  exports: [UsersService], // Asegúrate de exportar el UsersService
})
export class UsersModule {}