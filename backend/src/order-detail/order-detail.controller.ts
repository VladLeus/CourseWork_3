import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { OrderDetailService } from './order-detail.service';
import { OrderDetail } from '../db/entities/order_details.entity';
import { CreateOrderDetailDto } from '../dto/order-detail/create-order-detail.dto';

@Controller('details')
export class OrderDetailController {
  constructor(private readonly orderDetailService: OrderDetailService) {}

  @Get(':id')
  async getOrderDetailsById(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<OrderDetail> {
    return await this.orderDetailService.findById(id);
  }

  @Post()
  async create(
    @Body(ValidationPipe) createOrderDetailDto: CreateOrderDetailDto,
  ): Promise<OrderDetail> {
    return await this.orderDetailService.create(createOrderDetailDto);
  }
}
