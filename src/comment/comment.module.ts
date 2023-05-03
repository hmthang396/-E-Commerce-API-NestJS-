import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from 'src/customer/customer.entity';
import { Product } from 'src/product/product.entity';
import { Comment } from './comment.entity';
import { Like } from 'src/like/like.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Customer,Comment,Product,Like])],
  controllers: [CommentController],
  providers: [CommentService]
})
export class CommentModule {}
