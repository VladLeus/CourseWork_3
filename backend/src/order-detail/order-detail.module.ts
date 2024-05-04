import { Module } from '@nestjs/common';
import { DatabaseModule } from '../db/database.module';
import { orderDetailProviders } from './order-detail.providers';
import { OrderDetailService } from './order-detail.service';
import { OrderDetailController } from './order-detail.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [OrderDetailController],
  providers: [...orderDetailProviders, OrderDetailService],
  exports: [OrderDetailService],
})
export class OrderDetailModule {}
