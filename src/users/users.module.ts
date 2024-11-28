import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user.schema';
import { UsersGateway } from './users.gateway';
import { CoreModule } from './core/core.module'; 
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    CoreModule, 
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersGateway],
  exports: [UsersService], 
})
export class UsersModule {}