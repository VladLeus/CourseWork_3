import {
  Body,
  Controller,
  Get,
  Header,
  Param,
  ParseUUIDPipe,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from '../db/entities/orders.entity';
import { CreateOrderDto } from '../dto/order/create-order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  async getAllOrders(): Promise<Order[]> {
    return await this.orderService.findAll();
  }

  @Get(':id')
  async getOrderById(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<Order> {
    return await this.orderService.findById(id);
  }

  @Post()
  @Header('Content-Type', 'application/json')
  async create(
    @Body(ValidationPipe) createOrderDto: CreateOrderDto,
  ): Promise<string> {
    return await this.orderService.create(createOrderDto);
  }
}
