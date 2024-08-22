import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { OrdersRepository } from './orders.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/entitites/orders.entity';
import { OrderDetail } from 'src/entitites/orderDetails.entity';
import { User } from 'src/entitites/users.entity';
import { Product } from 'src/entitites/products.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    Order,
    OrderDetail,
    User,
    Product
  ])],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersRepository]
})
export class OrdersModule {}
