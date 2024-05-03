import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './users.entity';
import { OrderDetail } from './order_details.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => OrderDetail, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'order_details_id' })
  orderDetail: OrderDetail;
}
