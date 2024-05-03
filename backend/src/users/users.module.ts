import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { usersProviders } from './users.providers';
import { UsersController } from './users.controller';
import { DatabaseModule } from '../db/database.module';
import { CarModelModule } from '../car-model/car-model.module';

@Module({
  imports: [DatabaseModule, CarModelModule],
  controllers: [UsersController],
  providers: [...usersProviders, UsersService],
})
export class UsersModule {}
