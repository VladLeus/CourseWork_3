import { UsersService } from './users.service';
import {
  Body,
  Controller,
  Get,
  Header,
  Param,
  ParseUUIDPipe,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { User } from '../db/entities/users.entity';
import { CreateUserDto } from '../dto/user/create-user.dto';
import { LogInDto } from '../dto/user/log-in.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getAllUsers(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  @Get(':id')
  async getUserById(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<User> {
    return await this.usersService.findById(id);
  }

  @Post()
  @Header('Content-Type', 'application/json')
  async create(
    @Body(ValidationPipe) createUserDto: CreateUserDto,
  ): Promise<string> {
    return await this.usersService.create(createUserDto);
  }

  @Post('login')
  async logIn(@Body(ValidationPipe) logInDto: LogInDto): Promise<User> {
    return this.usersService.logIn(logInDto);
  }
}
