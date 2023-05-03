import { Module } from '@nestjs/common';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Color } from 'src/color/color.entity';
import { Transaction } from './transaction.entity';
import { Order } from 'src/order/order.entiry';
import { Product } from 'src/product/product.entity';
import { OrderModule } from 'src/order/order.module';

@Module({
  imports: [TypeOrmModule.forFeature([Color,Transaction,Order,Product]),OrderModule],
  controllers: [TransactionController],
  providers: [TransactionService],
  exports:[TransactionService]
})
export class TransactionModule {}
