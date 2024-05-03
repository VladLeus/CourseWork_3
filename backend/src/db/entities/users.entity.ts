import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { CarModel } from './car_model.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @ManyToOne(() => CarModel)
  @JoinColumn({ name: 'car_model_id' })
  carModel: CarModel;

  @Column({ type: 'enum', enum: ['ADMIN', 'CLIENT'] })
  userRole: string;
}
