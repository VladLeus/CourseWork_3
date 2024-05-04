import { Inject, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Order } from '../db/entities/orders.entity';
import { CreateOrderDto } from '../dto/order/create-order.dto';
import { User } from '../db/entities/users.entity';
import { UsersService } from '../users/users.service';
import { OrderDetailService } from '../order-detail/order-detail.service';
import { v4 as uuidv4 } from 'uuid';
import { OrderDetail } from '../db/entities/order_details.entity';

export class OrderService {
  constructor(
    @Inject('ORDER_REPOSITORY')
    private readonly orderRepository: Repository<Order>,
    private readonly userService: UsersService,
    private readonly orderDetailService: OrderDetailService,
  ) {}

  async findAll(): Promise<Order[]> {
    return this.orderRepository.find();
  }

  async findById(id: string): Promise<Order> {
    return this.orderRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.user', 'user')
      .leftJoinAndSelect('order.orderDetail', 'orderDetail')
      .where('order.id = :id', { id })
      .getOne()
      .catch(() => {
        throw new NotFoundException('Order not found');
      });
  }

  async create(createOrderDto: CreateOrderDto): Promise<string> {
    const user: User = await this.userService.findById(
      createOrderDto.dto_user_id,
    );
    const orderDetail: OrderDetail = await this.orderDetailService.findById(
      createOrderDto.dto_order_details_id,
    );

    const newOrder: Order = {
      id: uuidv4(),
      user: user,
      orderDetail: orderDetail,
    };

    await this.orderRepository.save(newOrder);
    return newOrder.id;
  }
}
