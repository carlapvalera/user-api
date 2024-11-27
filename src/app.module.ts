import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { UseController } from './use/use.controller';
import { CoreModule } from './users/core/core.module'; // Importa el módulo del logger

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/nest'), UsersModule, CoreModule,],
  controllers: [AppController, UseController],
  providers: [AppService],
})
export class AppModule {}
  