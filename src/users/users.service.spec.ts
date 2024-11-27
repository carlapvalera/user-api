// src/users/users.service.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getModelToken } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model } from 'mongoose';

describe('UsersService', () => {
  let service: UsersService;
  let model: Model<User>;

  const mockUser = {
    username: 'testuser',
    email: 'test@example.com',
    password: 'hashedpassword',
  };

  const mockUserModel = {
    create: jest.fn().mockResolvedValue(mockUser),
    find: jest.fn().mockResolvedValue([mockUser]),
    findById: jest.fn().mockResolvedValue(mockUser),
    findByIdAndUpdate: jest.fn().mockResolvedValue(mockUser),
    findByIdAndDelete: jest.fn().mockResolvedValue(mockUser),
    findOne: jest.fn().mockResolvedValue(mockUser),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken(User.name),
          useValue: mockUserModel, // Usa el mock aquí
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    model = module.get<Model<User>>(getModelToken(User.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a user', async () => {
      const user = await service.create(mockUser);
      expect(user).toEqual(mockUser);
      expect(model.create).toHaveBeenCalledWith(mockUser);
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const users = await service.findAll();
      expect(users).toEqual([mockUser]);
      expect(model.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a user by id', async () => {
      const user = await service.findOne('someId');
      expect(user).toEqual(mockUser);
      expect(model.findById).toHaveBeenCalledWith('someId');
    });
  });

  describe('update', () => {
    it('should update a user and return the updated user', async () => {
      const updatedUser = await service.update('someId', mockUser);
      expect(updatedUser).toEqual(mockUser);
      expect(model.findByIdAndUpdate).toHaveBeenCalledWith('someId', mockUser, { new: true });
    });
  });

  describe('remove', () => {
    it('should remove a user and return the deleted user', async () => {
      const deletedUser = await service.remove('someId');
      expect(deletedUser).toEqual(mockUser);
      expect(model.findByIdAndDelete).toHaveBeenCalledWith('someId');
    });
  });

  describe('findOneByEmail', () => {
    it('should return a user by email', async () => {
      const user = await service.findOneByEmail(mockUser.email);
      expect(user).toEqual(mockUser);
      expect(model.findOne).toHaveBeenCalledWith({ email: mockUser.email });
    });
  });
});