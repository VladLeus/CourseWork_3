import { Inject, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Order } from '../db/entities/orders.entity';

export class OrderService {
  constructor(
    @Inject('ORDER_REPOSITORY')
    private readonly orderRepository: Repository<Order>,
  ) {
  }

  async findAll(): Promise<Order[]> {
    return this.orderRepository.find();
  }

  async findById(id: string): Promise<Order> {
    return this.orderRepository.createQueryBuilder('order')
      .leftJoinAndSelect('order.user', 'user')
      .leftJoinAndSelect('order.orderDetail', 'orderDetail')
      .where('order.id = :id', { id })
      .getOne()
      .catch(() => {
        throw new NotFoundException('Order not found');
      });
  }
}