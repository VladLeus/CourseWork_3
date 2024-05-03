import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../db/entities/users.entity';
import { CreateUserDto } from '../dto/user/create-user.dto';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import { CarModelService } from '../car-model/car-model.service';
import { CarModel } from '../db/entities/car_model.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private readonly usersRepository: Repository<User>,
    private readonly carModelService: CarModelService,
  ) {
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findById(id: string): Promise<User> {
    return this.usersRepository.createQueryBuilder('user')
      .leftJoinAndSelect('user.carModel', 'carModel')
      .where('user.id = :id', { id })
      .getOne()
      .catch(() => {
        throw new NotFoundException('User not found');
      });
  }

  async create(createUserDto: CreateUserDto): Promise<string> {
    const carModel: CarModel = await this.carModelService.findById(createUserDto.dto_car_model_id);
    const saltOrRounds: number = 10;
    const hash: string = await bcrypt.hash(createUserDto.password, saltOrRounds);

    const newUser: User = {
      id: uuidv4(),
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,
      email: createUserDto.email,
      password: hash,
      carModel: carModel,
      userRole: createUserDto.dto_user_role,
    };

    await this.usersRepository.save(newUser);
    return newUser.id;
  }
}
