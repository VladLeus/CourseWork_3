import { Module } from '@nestjs/common';
import { DatabaseModule } from '../db/database.module';
import { orderProviders } from './order.providers';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [OrderController],
  providers: [...orderProviders, OrderService],
})
export class OrderModule {
}