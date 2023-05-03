import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto, InforProductDto, UpdateProductDto } from './product.dto';
import { classToPlain, plainToClass } from 'class-transformer';
import { Image } from 'src/image/image.entity';
import { ImageService } from 'src/image/image.service';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>
    ) { }

    async save(product: CreateProductDto): Promise<InforProductDto | null> {
        let productEntity = await this.productRepository.create(product);
        let productData = await this.productRepository.save(productEntity, { transaction: true })
        return plainToClass(InforProductDto, productData);
    }

    async findById(id: number): Promise<InforProductDto | null> {
        let productData = await this.productRepository.findOne({
            where: { id: id },
            relations: ['category','brand','subcategory','collection','discount']
        })
        return classToPlain(productData, { groups: ['details'] }) as InforProductDto;
    }

    async findAll(): Promise<InforProductDto | null> {
        let productData = await this.productRepository.find({
            relations: ['category','brand','subcategory','collection','discount']
        })
        return classToPlain(productData, { groups: ['details'] }) as InforProductDto;
    }

    async update(id: number, product: UpdateProductDto): Promise<InforProductDto | null> {
        let productEntity = this.productRepository.create(product);
        let productData = await this.productRepository.update(+id, productEntity);
        if (productData.affected) {
            let product = await this.productRepository.findOne({
                where: { id: id },
                relations: ['category','brand','subcategory','collection','discount']
            })
            return classToPlain(product, { groups: ['details'] }) as InforProductDto;
        } else {
            return null;
        }
    }

    async delete(id: number): Promise<InforProductDto | boolean> {
        let productData = await this.productRepository.delete({ id: +id });
        if (productData.affected) {
            return true;
        } else {
            return false;
        }
    }


}
