import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from './categories.entity';

@Entity()
export class CarPart {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Category, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ type: 'bytea', nullable: true })
  image: Buffer;

  @Column({ name: 'price_per_one' })
  pricePerOne: number;
}
