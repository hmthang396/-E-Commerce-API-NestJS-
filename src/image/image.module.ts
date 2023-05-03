import { Module } from '@nestjs/common';
import { ImageController } from './image.controller';
import { ImageService } from './image.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from './image.entity';
import { Color } from 'src/color/color.entity';
import { FirebaseModule } from 'src/storage/firebase.module';

@Module({
  imports: [TypeOrmModule.forFeature([Image, Color]), FirebaseModule],
  controllers: [ImageController],
  providers: [ImageService],
  exports: [ImageService]
})
export class ImageModule { }
