import { Module } from '@nestjs/common';
import { ColorController } from './color.controller';
import { ColorService } from './color.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Color } from './color.entity';
import { Transaction } from 'src/transaction/transaction.entity';
import { Product } from 'src/product/product.entity';
import { Image } from 'src/image/image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Color,Transaction,Product,Image])],
  controllers: [ColorController],
  providers: [ColorService],
  exports:[ColorService]
})
export class ColorModule { }
