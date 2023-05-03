import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/category/category.entity';
import { SubCategory } from 'src/subcategory/subcategory.entity';
import { Collection } from 'src/collection/collection.entity';
import { Brand } from 'src/brand/brand.entity';
import { Discount } from 'src/discount/discount.entity';
import { Product } from './product.entity';
import { ImageModule } from 'src/image/image.module';
import { Comment } from 'src/comment/comment.entity';
import { Transaction } from 'src/transaction/transaction.entity';
import { Color } from 'src/color/color.entity';
import { Image } from 'src/image/image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category,SubCategory,Brand,Collection,Discount,Product,Comment,Transaction,Color,Image]),ImageModule],
  controllers: [ProductController],
  providers: [ProductService],
  exports:[ProductService]
})
export class ProductModule {}
