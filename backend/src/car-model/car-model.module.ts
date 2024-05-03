import { Module } from '@nestjs/common';
import { DatabaseModule } from '../db/database.module';
import { carModelProvider } from './car-model.provider';
import { CarModelService } from './car-model.service';
import { CarModelController } from './car-model.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [CarModelController],
  providers: [...carModelProvider, CarModelService],
  exports: [CarModelService]
})
export class CarModelModule {}