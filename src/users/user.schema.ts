import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// Extiende el tipo User con Document para que tenga acceso a los métodos de Mongoose
export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  username: string; // Nombre de usuario

  @Prop({ required: true })
  email: string; // Correo electrónico del usuario

  @Prop({ required: true })
  password: string; // Contraseña del usuario
}

export const UserSchema = SchemaFactory.createForClass(User);