"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("./user.schema");
const bcrypt = require("bcrypt");
const users_gateway_1 = require("./users.gateway");
const logger_service_1 = require("./core/logger.service");
let UsersService = class UsersService {
    constructor(userModel, logger, usersGateway) {
        this.userModel = userModel;
        this.logger = logger;
        this.usersGateway = usersGateway;
    }
    async create(createUserDto) {
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        const newUser = new this.userModel({ ...createUserDto, password: hashedPassword });
        this.usersGateway.handleUserAction({ userId: newUser.username, action: 'registró' });
        this.logger.log(`El usuario ${newUser.username} ha sido registrado.`);
        return newUser.save();
    }
    async findAll() {
        return this.userModel.find().exec();
    }
    async findOne(id) {
        const user = await this.userModel.findById(id).exec();
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${id} not found`);
        }
        return user;
    }
    async update(id, updateUserDto) {
        const user = await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec();
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${id} not found`);
        }
        this.usersGateway.handleUserAction({ userId: user.username, action: 'actualizó' });
        this.logger.log(`El usuario ${user.username} ha sido actualizado.`);
        return user;
    }
    async remove(id) {
        const user = await this.userModel.findByIdAndDelete(id).exec();
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${id} not found`);
        }
        this.usersGateway.handleUserAction({ userId: user.username, action: 'eliminó' });
        this.logger.log(`El usuario ${user.username} ha sido eliminado.`);
        return user;
    }
    async findOneByEmail(email) {
        return this.userModel.findOne({ email }).exec();
    }
    async validateUser(email, password) {
        const user = await this.userModel.findOne({ email }).lean().exec();
        if (user && await bcrypt.compare(password, user.password)) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model, logger_service_1.CustomLoggerService, users_gateway_1.UsersGateway])
], UsersService);
//# sourceMappingURL=users.service.js.map