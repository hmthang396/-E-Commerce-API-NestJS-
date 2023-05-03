import { Injectable } from '@nestjs/common';
import { Color } from './color.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { InforColorDto, createColorDto, updateColorDto } from './color.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ColorService {
    constructor(
        @InjectRepository(Color)
        private colorRepository: Repository<Color>) { }

    async save(color: createColorDto): Promise<InforColorDto | null> {
        let colorEntity = await this.colorRepository.create(color);
        let colorData = await this.colorRepository.save(colorEntity, { transaction: true })
        return plainToClass(InforColorDto, colorData, { excludeExtraneousValues: true });
    }

    async findById(id: number): Promise<InforColorDto | null> {
        let colorData = await this.colorRepository.findOneBy({ id: id });
        return plainToClass(InforColorDto, colorData, { excludeExtraneousValues: true });
    }

    async findAll(): Promise<InforColorDto[] | null> {
        let colorData = await this.colorRepository.find();
        return colorData.map((e) => {
            return plainToClass(InforColorDto, e, { excludeExtraneousValues: true })
        })
    }

    async update(id: number, color: updateColorDto): Promise<InforColorDto | null> {
        let colorEntity = this.colorRepository.create(color);
        let colorData = await this.colorRepository.update(id, colorEntity);
        if (colorData.affected) {
            let color = await this.colorRepository.findOneBy({ id: id });
            return plainToClass(InforColorDto, color, { excludeExtraneousValues: true });
        } else {
            return null;
        }
    }

    async delete(id: number): Promise<InforColorDto | boolean> {
        let colorData = await this.colorRepository.delete({ id: id });
        if (colorData.affected) {
            return true;
        } else {
            return false;
        }
    }
}
