import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Discount } from './discount.entity';
import { Repository } from 'typeorm';
import { InforDiscountDto, createDiscountDto, updateDiscountDto } from './discount.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class DiscountService {
    constructor(
        @InjectRepository(Discount)
        private discountRepository: Repository<Discount>) { }

    async save(discount: createDiscountDto): Promise<InforDiscountDto | null> {
        let discountEntity = await this.discountRepository.create(discount);
        let discountData = await this.discountRepository.save(discountEntity, { transaction: true })
        return plainToClass(InforDiscountDto, discountData, { excludeExtraneousValues: true });
    }

    async findById(id: number): Promise<InforDiscountDto | null> {
        let discountData = await this.discountRepository.findOneBy({ id: id });
        return plainToClass(InforDiscountDto, discountData, { excludeExtraneousValues: true });
    }

    async findAll(): Promise<InforDiscountDto[] | null> {
        let discountData = await this.discountRepository.find();
        return discountData.map((e) => {
            return plainToClass(InforDiscountDto, e, { excludeExtraneousValues: true })
        })
    }

    async update(id: number, discount: updateDiscountDto): Promise<InforDiscountDto | null> {
        let discountEntity = this.discountRepository.create(discount);
        let discountData = await this.discountRepository.update(id, discountEntity);
        if (discountData.affected) {
            let discount = await this.discountRepository.findOneBy({ id: id });
            return plainToClass(InforDiscountDto, discount, { excludeExtraneousValues: true });
        } else {
            return null;
        }
    }

    async delete(id: number): Promise<InforDiscountDto | boolean> {
        let discountData = await this.discountRepository.delete({ id: id });
        if (discountData.affected) {
            return true;
        } else {
            return false;
        }
    }
}
