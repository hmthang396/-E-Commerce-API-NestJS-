import { Expose, Type } from "class-transformer"
import { IsBoolean, IsNotEmpty, IsString } from "class-validator"
import { InforBrandDto } from "src/brand/brand.dto"
import { Brand } from "src/brand/brand.entity"
import { InforCategoryDto } from "src/category/category.dto"
import { Category } from "src/category/category.entity"
import { InforCollectionDto } from "src/collection/collection.dto"
import { Collection } from "src/collection/collection.entity"
import { InforColorDto } from "src/color/color.dto"
import { InforDiscountDto } from "src/discount/discount.dto"
import { Discount } from "src/discount/discount.entity"
import { InforSubCategoryDto } from "src/subcategory/subcategory.dto"
import { SubCategory } from "src/subcategory/subcategory.entity"

export class CreateProductDto {
    @IsNotEmpty()
    @IsString()
    @Expose()
    title: string

    @IsNotEmpty()
    @IsString()
    @Expose()
    description : string

    @IsNotEmpty()
    @IsString()
    @Expose()
    type:string

    @IsNotEmpty()
    @IsBoolean()
    @Expose()
    status: boolean

    @IsNotEmpty()
    @IsBoolean()
    @Expose()
    isNew:boolean

    @Expose()
    brand: Brand

    @Expose()
    category: Category

    @Expose()
    collection: Collection

    @Expose()
    discount: Discount

    @Expose()
    subcategory: SubCategory
}

export class UpdateProductDto extends CreateProductDto { }

export class InforProductDto {
    @Expose()
    id: number

    @Expose()
    title: string

    @Expose()
    description : string

    @Expose()
    type:string

    @Expose()
    status : boolean

    @Expose()
    isNew:boolean

    @Expose()
    brand: InforBrandDto

    @Expose()
    category: InforCategoryDto

    @Expose()
    collection: InforCollectionDto

    @Expose()
    discount: InforDiscountDto

    @Expose()
    subcategory: InforSubCategoryDto

    @Type(() => InforColorDto)
    @Expose()
    images: InforColorDto[]

    @Expose()
    createdAt: Date

    @Expose()
    updatedAt: Date
}