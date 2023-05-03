import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Image } from './image.entity';
import { Repository } from 'typeorm';
import { InforImageDto, createImageDto, updateImageDto } from './image.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ImageService {
    constructor(
        @InjectRepository(Image)
        private imageRepository: Repository<Image>) { }

    async save(image: createImageDto[]): Promise<InforImageDto[] | null> {
        let imageEntity = await this.imageRepository.create(image);
        let imageData = await this.imageRepository.save(imageEntity, { transaction: true })
        return imageData.map((e) => {
            return plainToClass(InforImageDto, e, { excludeExtraneousValues: true });
        })
    }

    async findById(id: number): Promise<InforImageDto | null> {
        let imageData = await this.imageRepository.findOneBy({ id: id });
        return plainToClass(InforImageDto, imageData, { excludeExtraneousValues: true });
    }

    async findAll(): Promise<InforImageDto[] | null> {
        let imageData = await this.imageRepository.find();
        return imageData.map((e) => {
            return plainToClass(InforImageDto, e, { excludeExtraneousValues: true })
        })
    }

    async update(id: number, image: updateImageDto): Promise<InforImageDto | null> {
        let imageEntity = this.imageRepository.create(image);
        let imageData = await this.imageRepository.update(id, imageEntity);
        if (imageData.affected) {
            let image = await this.imageRepository.findOneBy({ id: id });
            return plainToClass(InforImageDto, image, { excludeExtraneousValues: true });
        } else {
            return null;
        }
    }

    async delete(id: number): Promise<InforImageDto | boolean> {
        let imageData = await this.imageRepository.delete({ id: id });
        if (imageData.affected) {
            return true;
        } else {
            return false;
        }
    }
}
