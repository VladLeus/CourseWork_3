import { DataSource } from 'typeorm';
import { CarPart } from '../db/entities/car_parts.entity';

export const carPartProviders = [{
  provide: 'CAR_PART_REPOSITORY',
  useFactory: (dataSource: DataSource) => dataSource.getRepository(CarPart),
  inject: ['DATA_SOURCE'],
}];