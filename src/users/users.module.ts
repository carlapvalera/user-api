
import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User, UserSchema } from './user.schema';
import { AuthService } from '../auth/auth.service'; // Importa AuthService

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    forwardRef(() => AuthService), // Usa forwardRef aquí si es necesario
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService], // Asegúrate de exportar el UsersService
})
export class UsersModule {}

