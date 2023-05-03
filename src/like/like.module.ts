import { Module } from '@nestjs/common';
import { LikeController } from './like.controller';
import { LikeService } from './like.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from 'src/customer/customer.entity';
import { Like } from './like.entity';
import { Comment } from 'src/comment/comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Customer,Comment,Like])],
  controllers: [LikeController],
  providers: [LikeService]
})
export class LikeModule {}
