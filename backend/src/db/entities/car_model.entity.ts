import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CarModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ default: 'Audi' })
  brand: string;
}
