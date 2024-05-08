import { UsersService } from './users.service';
import {
  Body,
  Controller,
  Get,
  Header,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { User } from '../db/entities/users.entity';
import { CreateUserDto } from '../dto/user/create-user.dto';
import { LogInDto } from '../dto/user/log-in.dto';
import { UserProfileDto } from '../dto/user/user-profile.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/admin')
  async getAllUsers(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  @Get(':id')
  async getUserById(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<UserProfileDto> {
    return await this.usersService.getUserProfile(id);
  }

  @Post()
  @Header('Content-Type', 'application/json')
  async create(
    @Body(ValidationPipe) createUserDto: CreateUserDto,
  ): Promise<UserProfileDto> {
    return await this.usersService.create(createUserDto);
  }

  @Post('login')
  async logIn(
    @Body(ValidationPipe) logInDto: LogInDto,
  ): Promise<UserProfileDto> {
    return this.usersService.logIn(logInDto);
  }

  @Patch(':id/update')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body(ValidationPipe) creteUserDto: CreateUserDto,
  ): Promise<UserProfileDto> {
    return this.usersService.update(id, creteUserDto);
  }
}
