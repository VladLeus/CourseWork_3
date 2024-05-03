import { UsersService } from './users.service';
import { Controller, Get } from '@nestjs/common';
import { User } from '../db/entities/users.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getAllUsers(): Promise<User[]> {
    return await this.usersService.findAll();
  }
}
