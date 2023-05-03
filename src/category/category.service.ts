import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "./category.entity";
import { Repository } from "typeorm";
import { InforCategoryDto, createCategoryDto, updateCategoryDto } from "./category.dto";
import { plainToClass } from "class-transformer";

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category)
        private categoryRepository: Repository<Category>) { }

    async save(category: createCategoryDto): Promise<InforCategoryDto | null> {
        let categoryEntity = await this.categoryRepository.create(category);
        let categoryData = await this.categoryRepository.save(categoryEntity, { transaction: true })
        return plainToClass(InforCategoryDto, categoryData, { excludeExtraneousValues: true });
    }

    async findById(id: number): Promise<InforCategoryDto | null> {
        let categoryData = await this.categoryRepository.findOneBy({ id: id });
        return plainToClass(InforCategoryDto, categoryData, { excludeExtraneousValues: true });
    }

    async findAll(): Promise<InforCategoryDto[] | null> {
        let categoryData = await this.categoryRepository.find();
        return categoryData.map((e) => {
            return plainToClass(InforCategoryDto, e, { excludeExtraneousValues: true })
        })
    }

    async update(id: number, category: updateCategoryDto): Promise<InforCategoryDto | null> {
        let categoryEntity = this.categoryRepository.create(category);
        let categoryData = await this.categoryRepository.update(id, categoryEntity);
        if (categoryData.affected) {
            let category = await this.categoryRepository.findOneBy({ id: id });
            return plainToClass(InforCategoryDto, category, { excludeExtraneousValues: true });
        } else {
            return null;
        }
    }

    async delete(id: number): Promise<InforCategoryDto | boolean> {
        let categoryData = await this.categoryRepository.delete({ id: id });
        if (categoryData.affected) {
            return true;
        } else {
            return false;
        }
    }
}