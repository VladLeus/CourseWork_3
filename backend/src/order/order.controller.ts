import {
  Body,
  Controller,
  Delete,
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
    return await this.orderService.getAllOrders();
  }

  @Get(':id')
  async getOrderById(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<Order> {
    return await this.orderService.getOrderById(id);
  }

  @Post()
  @Header('Content-Type', 'application/json')
  async create(
    @Body(ValidationPipe) createOrderDto: CreateOrderDto,
  ): Promise<{ newOrderId: string }> {
    return await this.orderService.create(createOrderDto);
  }

  @Get('/user/:userId')
  async getUserOrders(
    @Param('userId', new ParseUUIDPipe()) userId: string,
  ): Promise<Order[]> {
    return this.orderService.getUserOrders(userId);
  }

  @Delete(':id')
  async delete(@Param('id', new ParseUUIDPipe()) id: string): Promise<boolean> {
    return this.orderService.delete(id);
  }
}
