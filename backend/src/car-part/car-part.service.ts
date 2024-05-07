import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CarPart } from '../db/entities/car_parts.entity';

@Injectable()
export class CarPartService {
  constructor(
    @Inject('CAR_PART_REPOSITORY')
    private readonly carPartRepository: Repository<CarPart>,
  ) {}

  async findAll(): Promise<CarPart[]> {
    return this.carPartRepository
      .createQueryBuilder('carPart')
      .leftJoinAndSelect('carPart.category', 'category')
      .getMany()
      .catch(() => {
        throw new NotFoundException('Car part not found');
      });
  }

  async findById(id: string): Promise<CarPart> {
    return this.carPartRepository
      .createQueryBuilder('carPart')
      .leftJoinAndSelect('carPart.category', 'category')
      .where('carPart.id = :id', { id })
      .getOne()
      .catch(() => {
        throw new NotFoundException('Car part not found');
      });
  }
}
