import { DataSource } from 'typeorm';
import { CarModel } from '../db/entities/car_model.entity';

export const carModelProvider = [
  {
    provide: 'CAR_MODEL_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(CarModel),
    inject: ['DATA_SOURCE'],
  },
];
