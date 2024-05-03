import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { OrderDetail } from '../db/entities/order_details.entity';

@Injectable()
export class OrderDetailService {
  constructor(
    @Inject('ORDER_DETAIL_REPOSITORY')
    private readonly orderDetailRepository: Repository<OrderDetail>,
  ) {
  }

  async findById(id: string): Promise<OrderDetail> {
    return this.orderDetailRepository.findOneOrFail({
      where: {
        id,
      },
    }).catch(() => {
      throw new NotFoundException('Order details doesn\'t exist');
    });
  }
}