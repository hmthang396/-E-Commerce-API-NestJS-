import { Expose } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { InforCategoryDto } from "src/category/category.dto";
import { Category } from "src/category/category.entity";

export class CreateSubCategoryDto {
    @IsNotEmpty()
    @IsString()
    @Expose()
    title: string

    @Expose()
    category: Category
}

export class UpdateSubCategoryDto extends CreateSubCategoryDto { }

export class InforSubCategoryDto {
    @Expose()
    id: number

    @Expose()
    title: string

    @Expose()
    category: InforCategoryDto

    @Expose()
    createdAt: Date

    @Expose()
    updatedAt: Date
}