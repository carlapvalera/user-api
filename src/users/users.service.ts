import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersGateway } from './users.gateway'; 
import { CustomLoggerService } from './core/logger.service'; 

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>, private readonly logger: CustomLoggerService,private usersGateway: UsersGateway,) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const newUser = new this.userModel({ ...createUserDto, password: hashedPassword });
    this.usersGateway.handleUserAction({ userId: newUser.username, action: 'registró' }); // Emitir mensaje
    this.logger.log(`El usuario ${newUser.username} ha sido registrado.`); // Log de la operación
    return newUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async update(id: string, updateUserDto: Partial<User>): Promise<User> {
    const user = await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec();
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    this.usersGateway.handleUserAction({ userId: user.username, action: 'actualizó' }); // Emitir mensaje
    this.logger.log(`El usuario ${user.username} ha sido actualizado.`); // Log de la operación
    return user;
  }

  async remove(id: string): Promise<User> {
    const user = await this.userModel.findByIdAndDelete(id).exec();
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    this.usersGateway.handleUserAction({ userId: user.username, action: 'eliminó' }); // Emitir mensaje
    this.logger.log(`El usuario ${user.username} ha sido eliminado.`); // Log de la operación
    return user;
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userModel.findOne({ email }).lean().exec(); 
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user; 
      return result;
    }
    return null; 
  }
}