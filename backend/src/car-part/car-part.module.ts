import { Module } from '@nestjs/common';
import { DatabaseModule } from '../db/database.module';
import { carPartProviders } from './car-part.providers';
import { CarPartController } from './car-part.controller';
import { CarPartService } from './car-part.service';

@Module({
  imports: [DatabaseModule],
  controllers: [CarPartController],
  providers: [...carPartProviders, CarPartService],
})
export class CarPartModule {}
