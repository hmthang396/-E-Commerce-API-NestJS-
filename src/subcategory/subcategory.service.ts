import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SubCategory } from "./subcategory.entity";
import { Repository } from "typeorm";
import { CreateSubCategoryDto, InforSubCategoryDto, UpdateSubCategoryDto } from "./subcategory.dto";
import { classToPlain, plainToClass } from "class-transformer";

@Injectable()
export class SubCategoryService {

    constructor(
        @InjectRepository(SubCategory)
        private subCategoryRepository: Repository<SubCategory>

    ) { }

    async save(subcategory: CreateSubCategoryDto): Promise<InforSubCategoryDto | null> {
        let subCategoryEntity = await this.subCategoryRepository.create(subcategory);
        let subCategoryData = await this.subCategoryRepository.save(subCategoryEntity, { transaction: true })
        return plainToClass(InforSubCategoryDto, subCategoryData);
    }


    async findById(id: number): Promise<InforSubCategoryDto | null> {
        let subCategoryData = await this.subCategoryRepository.findOne({
            where: { id: id },
            relations: ['category']
        })
        return classToPlain(subCategoryData, { groups: ['details'] }) as InforSubCategoryDto;
    }

    async findAll(): Promise<InforSubCategoryDto | null> {
        let subCategoryData = await this.subCategoryRepository.find({
            relations: ['category']
        })
        return classToPlain(subCategoryData, { groups: ['details'] }) as InforSubCategoryDto;
    }

    async update(id: number, subcategory: UpdateSubCategoryDto): Promise<InforSubCategoryDto | null> {
        let subCategoryEntity = this.subCategoryRepository.create(subcategory);
        let subCategoryData = await this.subCategoryRepository.update(+id, subCategoryEntity);
        if (subCategoryData.affected) {
            let subCategory = await this.subCategoryRepository.findOneBy({ id: id });
            return plainToClass(InforSubCategoryDto, subCategory, { excludeExtraneousValues: true });
        } else {
            return null;
        }
    }


    async delete(id: number): Promise<InforSubCategoryDto | boolean> {
        let subCategoryData = await this.subCategoryRepository.delete({ id: +id });
        if (subCategoryData.affected) {
            return true;
        } else {
            return false;
        }
    }
}
