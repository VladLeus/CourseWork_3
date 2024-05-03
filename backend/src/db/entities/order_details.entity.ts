import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class OrderDetail {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'parts_bought', type: 'jsonb' })
  partsBought: object[];

  @Column({ name: 'total_price' })
  totalPrice: number;

  @Column({ name: 'order_date' })
  orderDate: Date;
}
