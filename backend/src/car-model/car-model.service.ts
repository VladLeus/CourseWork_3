import { Inject, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CarModel } from '../db/entities/car_model.entity';

export class CarModelService {
  constructor(
    @Inject('CAR_MODEL_REPOSITORY')
    private readonly carModelRepository: Repository<CarModel>,
  ) {}

  async findAll(): Promise<CarModel[]> {
    return this.carModelRepository.find();
  }

  async findById(id: string): Promise<CarModel> {
    return this.carModelRepository
      .findOneOrFail({
        where: {
          id,
        },
      })
      .catch(() => {
        throw new NotFoundException('Car model not found');
      });
  }
}
