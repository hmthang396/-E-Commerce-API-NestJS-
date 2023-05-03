import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { Order } from './order.entiry';
import { Customer } from 'src/customer/customer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UtilsService } from './order.utils';
import { Transaction } from 'src/transaction/transaction.entity';
import { TransactionModule } from 'src/transaction/transaction.module';
import { TransactionService } from 'src/transaction/transaction.service';
import { ProductService } from 'src/product/product.service';
import { ProductModule } from 'src/product/product.module';

@Module({
  imports: [TypeOrmModule.forFeature([Order,Customer,Transaction])],
  controllers: [OrderController],
  providers: [OrderService,UtilsService],
  exports:[UtilsService]
})
export class OrderModule {}
