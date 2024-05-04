import { Module } from '@nestjs/common';
import { DatabaseModule } from '../db/database.module';
import { orderProviders } from './order.providers';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { UsersModule } from '../users/users.module';
import { OrderDetailModule } from '../order-detail/order-detail.module';

@Module({
  imports: [DatabaseModule, UsersModule, OrderDetailModule],
  controllers: [OrderController],
  providers: [...orderProviders, OrderService],
})
export class OrderModule {}
