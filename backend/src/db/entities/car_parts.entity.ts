import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Category } from './categories.entity';

@Entity()
export class CarPart {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  image: Buffer;

  @Column({ name: 'price_per_one' })
  pricePerOne: number;
}