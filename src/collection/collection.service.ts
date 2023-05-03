import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Collection } from './collection.entity';
import { Repository } from 'typeorm';
import { CreateCollectionDto, InforCollectionDto } from './collection.dto';
import { classToPlain, plainToClass } from 'class-transformer';
import { updateCategoryDto } from 'src/category/category.dto';

@Injectable()
export class CollectionService {
    constructor(
        @InjectRepository(Collection)
        private collectionRepository: Repository<Collection>) { }

    async save(collection: CreateCollectionDto): Promise<InforCollectionDto | null> {
        let collectionEntity = await this.collectionRepository.create(collection);
        let collectionData = await this.collectionRepository.save(collectionEntity, { transaction: true })
        return plainToClass(InforCollectionDto, collectionData);
    }

    async findById(id: number): Promise<InforCollectionDto | null> {
        let collectionData = await this.collectionRepository.findOne({
            where: { id: id },
            relations: ['brand']
        })
        return classToPlain(collectionData, { groups: ['details'] }) as InforCollectionDto;
    }

    async findAll(): Promise<InforCollectionDto | null> {
        let collectionData = await this.collectionRepository.find({
            relations: ['brand']
        })
        return classToPlain(collectionData, { groups: ['details'] }) as InforCollectionDto;
    }

    async update(id: number, collection: updateCategoryDto): Promise<InforCollectionDto | null> {
        let collectionEntity = this.collectionRepository.create(collection);
        let collectionData = await this.collectionRepository.update(+id, collectionEntity);
        if (collectionData.affected) {
            let collection = await this.collectionRepository.findOneBy({ id: id });
            return plainToClass(InforCollectionDto, collection, { excludeExtraneousValues: true });
        } else {
            return null;
        }
    }

    async delete(id: number): Promise<InforCollectionDto | boolean> {
        let collectionData = await this.collectionRepository.delete({ id: +id });
        if (collectionData.affected) {
            return true;
        } else {
            return false;
        }
    }
}
