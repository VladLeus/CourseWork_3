import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './users.entity';
import { OrderDetail } from './order_details.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => OrderDetail)
  @JoinColumn({ name: 'order_details_id' })
  orderDetail: OrderDetail;
}
