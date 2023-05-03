import { Module } from '@nestjs/common';
import { BrandController } from './brand.controller';
import { BrandService } from './brand.service';
import { Brand } from './brand.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Collection } from 'src/collection/collection.entity';
import { Product } from 'src/product/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Brand,Collection,Product])],
  controllers: [BrandController],
  providers: [BrandService]
})
export class BrandModule {}
