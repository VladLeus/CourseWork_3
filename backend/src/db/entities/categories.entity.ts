import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  provider: string;

  @Column({ name: 'provider_phone_number' })
  providerPhoneNumber: string;
}
