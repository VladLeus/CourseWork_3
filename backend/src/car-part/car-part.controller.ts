import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { CarPartService } from './car-part.service';
import { CarPart } from '../db/entities/car_parts.entity';

@Controller('parts')
export class CarPartController {
  constructor(private readonly carPartService: CarPartService) {}

  @Get()
  async getAllCarParts(): Promise<CarPart[]> {
    return await this.carPartService.findAll();
  }

  @Get(':id')
  async getCarPartById(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<CarPart> {
    return await this.carPartService.findById(id);
  }
}
