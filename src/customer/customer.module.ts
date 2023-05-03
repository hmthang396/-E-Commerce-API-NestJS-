import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './customer.entity';
import { Comment } from 'src/comment/comment.entity';
import { Like } from 'src/like/like.entity';
import { Order } from 'src/order/order.entiry';

@Module({
  imports: [TypeOrmModule.forFeature([Customer,Comment,Like,Order])],
  controllers: [CustomerController],
  providers: [CustomerService]
})
export class CustomerModule { }
