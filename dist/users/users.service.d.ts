import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { UserInterface } from './user.interface';
export declare class UsersService {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    create(user: Partial<User>): Promise<User>;
    findAll(): Promise<User[]>;
    findOne(id: string): Promise<User>;
    findOneByEmail(email: string): Promise<UserInterface | null>;
    update(id: string, user: Partial<User>): Promise<User>;
    remove(id: string): Promise<User>;
}
