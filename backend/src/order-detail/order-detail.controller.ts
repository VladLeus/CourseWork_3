import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { OrderDetailService } from './order-detail.service';
import { OrderDetail } from '../db/entities/order_details.entity';

@Controller('details')
export class OrderDetailController {
  constructor(
    private readonly orderDetailService: OrderDetailService,
  ) {
  }

  @Get(':id')
  async getOrderDetailsById(@Param('id', new ParseUUIDPipe()) id: string): Promise<OrderDetail> {
    return await this.orderDetailService.findById(id);
  }
}