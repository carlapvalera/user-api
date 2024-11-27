import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersGateway } from './users.gateway';
import { CustomLoggerService } from './core/logger.service';
export declare class UsersService {
    private userModel;
    private readonly logger;
    private usersGateway;
    constructor(userModel: Model<UserDocument>, logger: CustomLoggerService, usersGateway: UsersGateway);
    create(createUserDto: CreateUserDto): Promise<User>;
    findAll(): Promise<User[]>;
    findOne(id: string): Promise<User>;
    update(id: string, updateUserDto: Partial<User>): Promise<User>;
    remove(id: string): Promise<User>;
    findOneByEmail(email: string): Promise<User | null>;
    validateUser(email: string, password: string): Promise<any>;
}
