import { Controller, Get } from '@nestjs/common';
import { CarModelService } from './car-model.service';
import { CarModel } from '../db/entities/car_model.entity';

@Controller('models')
export class CarModelController {
  constructor(private readonly carModelService: CarModelService) {}

  @Get()
  async getAllCarModels(): Promise<CarModel[]> {
    return await this.carModelService.findAll();
  }
}
