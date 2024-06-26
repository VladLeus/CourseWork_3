import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
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

  @ManyToOne(() => CarModel, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'car_model_id' })
  carModel: CarModel;

  @Column({ name: 'user_role', type: 'enum', enum: ['ADMIN', 'CLIENT'] })
  userRole: string;
}
