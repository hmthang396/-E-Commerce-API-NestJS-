import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brand } from './brand.entity';
import { Repository } from 'typeorm';
import { InforBrandDto, createBrandDto, updateBrandDto } from './brand.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class BrandService {
    constructor(
        @InjectRepository(Brand)
        private brandRepository: Repository<Brand>) { }

    async save(brand: createBrandDto): Promise<InforBrandDto | null> {
        let brandEntity = await this.brandRepository.create(brand);
        let brandData = await this.brandRepository.save(brandEntity, { transaction: true })
        return plainToClass(InforBrandDto, brandData, { excludeExtraneousValues: true });
    }

    async findById(id: number): Promise<InforBrandDto | null> {
        let brandData = await this.brandRepository.findOneBy({ id: id });
        return plainToClass(InforBrandDto, brandData, { excludeExtraneousValues: true });
    }

    async findAll(): Promise<InforBrandDto[] | null> {
        let brandData = await this.brandRepository.find();
        return brandData.map((e) => {
            return plainToClass(InforBrandDto, e, { excludeExtraneousValues: true })
        })
    }

    async update(id: number, brand: updateBrandDto): Promise<InforBrandDto | null> {
        let brandEntity = this.brandRepository.create(brand);
        let brandData = await this.brandRepository.update(id, brandEntity);
        if (brandData.affected) {
            let brand = await this.brandRepository.findOneBy({ id: id });
            return plainToClass(InforBrandDto, brand, { excludeExtraneousValues: true });
        } else {
            return null;
        }
    }

    async delete(id: number): Promise<InforBrandDto | boolean> {
        let brandData = await this.brandRepository.delete({ id: id });
        if (brandData.affected) {
            return true;
        } else {
            return false;
        }
    }
}
