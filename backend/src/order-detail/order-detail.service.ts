import {
  HttpException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { OrderDetail } from '../db/entities/order_details.entity';
import { v4 as uuidv4 } from 'uuid';
import { CreateOrderDetailDto } from '../dto/order-detail/create-order-detail.dto';

@Injectable()
export class OrderDetailService {
  constructor(
    @Inject('ORDER_DETAIL_REPOSITORY')
    private readonly orderDetailRepository: Repository<OrderDetail>,
  ) {}

  async findById(id: string): Promise<OrderDetail> {
    return this.orderDetailRepository
      .findOneOrFail({
        where: {
          id,
        },
      })
      .catch(() => {
        throw new NotFoundException("Order details doesn't exist");
      });
  }

  async create(
    createOrderDetailDto: CreateOrderDetailDto,
  ): Promise<OrderDetail> {
    const newOrderDetail: OrderDetail = {
      id: uuidv4(),
      partsBought: createOrderDetailDto.dto_partsBought,
      totalPrice: createOrderDetailDto.dto_totalPrice,
      orderDate: new Date(),
    };

    await this.orderDetailRepository.save(newOrderDetail).catch((e) => {
      throw new HttpException(e.message, e.code);
    });

    return newOrderDetail;
  }

  async update(
    id: string,
    createOrderDetailDto: CreateOrderDetailDto,
  ): Promise<OrderDetail> {
    const updatedOrderDetail: OrderDetail = {
      id: id,
      partsBought: createOrderDetailDto.dto_partsBought,
      totalPrice: createOrderDetailDto.dto_totalPrice,
      orderDate: new Date(),
    };

    await this.orderDetailRepository.save(updatedOrderDetail).catch((e) => {
      throw new HttpException(e.message, e.code);
    });

    return updatedOrderDetail;
  }

  async delete(id: string): Promise<boolean> {
    await this.orderDetailRepository.delete(id).catch((e) => {
      throw new HttpException(e.message, e.code);
    });

    return true;
  }
}
