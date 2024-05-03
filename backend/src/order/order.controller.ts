import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from '../db/entities/orders.entity';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {
  }

  @Get()
  async getAllOrders(): Promise<Order[]> {
    return await this.orderService.findAll();
  }

  @Get(':id')
  async getOrderById(@Param('id', new ParseUUIDPipe()) id: string): Promise<Order> {
    return await this.orderService.findById(id);
  }
}