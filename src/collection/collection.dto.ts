import { Expose } from "class-transformer"
import { IsNotEmpty, IsString } from "class-validator"
import { InforBrandDto } from "src/brand/brand.dto"
import { Brand } from "src/brand/brand.entity"

export class CreateCollectionDto {
    @IsNotEmpty()
    @IsString()
    @Expose()
    title: string

    @Expose()
    brand: Brand
}

export class UpdateCollectionDto extends CreateCollectionDto { }

export class InforCollectionDto {
    @Expose()
    id: number

    @Expose()
    title: string

    @Expose()
    brand: InforBrandDto

    @Expose()
    createdAt: Date

    @Expose()
    updatedAt: Date
}