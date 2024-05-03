import { Module } from '@nestjs/common';
import { DatabaseModule } from '../db/database.module';
import { orderDetailProviders } from './order-detail.providers';
import { OrderDetailService } from './order-detail.service';

@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [...orderDetailProviders, OrderDetailService],
})
export class OrderDetailModule {
}