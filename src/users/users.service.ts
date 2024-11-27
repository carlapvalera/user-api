import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { UserInterface } from './user.interface'; // Importa la interfaz

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(user: Partial<User>): Promise<User> {
    const newUser = new this.userModel(user);
    return newUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User> {
    return this.userModel.findById(id).exec();
  }

  // Cambia el tipo de retorno a UserInterface
  async findOneByEmail(email: string): Promise<UserInterface | null> {
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) return null;

    // Devuelve solo las propiedades necesarias
    return {
      username: user.username,
      email: user.email,
      password: user.password, // Aunque no deberías devolver la contraseña en un entorno real
    };
  }

  async update(id: string, user: Partial<User>): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, user, { new: true }).exec();
  }

  async remove(id: string): Promise<User> {
    return this.userModel.findByIdAndDelete(id).exec();
  }
}