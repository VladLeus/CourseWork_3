import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CarModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name' })
  name: string;

  @Column({ default: 'Audi' })
  brand: string;
}
