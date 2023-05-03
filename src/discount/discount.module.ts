import { Module } from '@nestjs/common';
import { DiscountController } from './discount.controller';
import { DiscountService } from './discount.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Discount } from './discount.entity';
import { Product } from 'src/product/product.entity';

@Module({
  
  imports: [TypeOrmModule.forFeature([Discount,Product])],
  controllers: [DiscountController],
  providers: [DiscountService]
})
export class DiscountModule {}
