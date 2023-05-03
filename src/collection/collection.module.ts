import { Module } from '@nestjs/common';
import { CollectionController } from './collection.controller';
import { CollectionService } from './collection.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Brand } from 'src/brand/brand.entity';
import { Collection } from './collection.entity';
import { Product } from 'src/product/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Brand,Collection,Product])],
  controllers: [CollectionController],
  providers: [CollectionService]
})
export class CollectionModule {}
