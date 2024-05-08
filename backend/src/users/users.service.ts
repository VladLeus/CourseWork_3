import {
  HttpException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../db/entities/users.entity';
import { CreateUserDto } from '../dto/user/create-user.dto';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import { CarModelService } from '../car-model/car-model.service';
import { CarModel } from '../db/entities/car_model.entity';
import { LogInDto } from '../dto/user/log-in.dto';
import { UserProfileDto } from '../dto/user/user-profile.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private readonly usersRepository: Repository<User>,
    private readonly carModelService: CarModelService,
  ) {}

  async findAll(): Promise<User[]> {
    return this.usersRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.carModel', 'carModel')
      .getMany()
      .catch((e) => {
        throw new HttpException(e.message, e.code);
      });
  }

  async findById(id: string): Promise<User> {
    return this.usersRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.carModel', 'carModel')
      .where('user.id = :id', { id })
      .getOne()
      .catch(() => {
        throw new NotFoundException('User not found');
      });
  }

  async create(createUserDto: CreateUserDto): Promise<UserProfileDto> {
    const carModel: CarModel = await this.carModelService.findById(
      createUserDto.dto_car_model_id,
    );
    const saltOrRounds: number = 10;
    const hash: string = await bcrypt.hash(
      createUserDto.password,
      saltOrRounds,
    );

    const newUser: User = {
      id: uuidv4(),
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,
      email: createUserDto.email,
      password: hash,
      carModel: carModel,
      userRole: createUserDto.dto_user_role,
    };

    await this.usersRepository.save(newUser).catch((e) => {
      throw new HttpException(e.message, e.code);
    });

    return {
      id: newUser.id,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      dto_car_model_id: newUser.carModel.id,
      dto_user_role: newUser.userRole,
    };
  }

  async getUserProfile(id: string): Promise<UserProfileDto> {
    const user: User = await this.findById(id);
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      dto_user_role: user.userRole,
      dto_car_model_id: user.carModel.id,
    };
  }

  async logIn(logInDto: LogInDto): Promise<UserProfileDto> {
    const users: User[] = await this.findAll();
    const currUser: User = users.filter(
      (user: User) => user.email === logInDto.email,
    )[0];

    if (!currUser) {
      throw new UnauthorizedException('Incorrect email or password');
    }
    let isMatch: boolean;

    if (currUser.userRole === 'ADMIN') {
      isMatch = currUser.password === logInDto.password;
    } else {
      isMatch = await bcrypt.compare(logInDto.password, currUser.password);
    }

    if (!isMatch) {
      throw new UnauthorizedException('Incorrect email or password');
    }

    return {
      id: currUser.id,
      firstName: currUser.firstName,
      lastName: currUser.lastName,
      email: currUser.email,
      dto_user_role: currUser.userRole,
      dto_car_model_id: currUser.carModel?.id,
    };
  }

  async update(
    id: string,
    createUserDto: CreateUserDto,
  ): Promise<UserProfileDto> {
    const carModel: CarModel = await this.carModelService.findById(
      createUserDto.dto_car_model_id,
    );
    const saltOrRounds: number = 10;
    const hash: string = await bcrypt.hash(
      createUserDto.password,
      saltOrRounds,
    );

    const user: User = {
      id: id,
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,
      email: createUserDto.email,
      password: hash,
      carModel: carModel,
      userRole: createUserDto.dto_user_role,
    };

    await this.usersRepository.save(user).catch((e) => {
      throw new HttpException(e.message, e.code);
    });

    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      dto_user_role: user.userRole,
      dto_car_model_id: user.carModel.id,
    };
  }
}
