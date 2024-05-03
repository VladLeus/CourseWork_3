import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CarModelModule } from './car-model/car-model.module';

@Module({
  imports: [UsersModule, CarModelModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
