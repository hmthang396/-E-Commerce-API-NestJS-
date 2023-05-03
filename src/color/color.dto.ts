import { Expose, Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { InforImageDto } from "src/image/image.dto";
import { Product } from "src/product/product.entity";

export class createColorDto{
    @IsNotEmpty()
    @IsString()
    @Expose()
    color: string

    @IsNotEmpty()
    @IsNumber()
    @Expose()
    stock: number

    @IsNotEmpty()
    @IsNumber()
    @Expose()
    price: number

    @IsNotEmpty()
    @Expose()
    product: Product
}
export class updateColorDto extends createColorDto{}

export class InforColorDto {
    @Expose()
    id: number

    @Expose()
    color: string

    @Expose()
    stock: number

    @Expose()
    price: number

    @Type(() => InforImageDto)
    @Expose()
    images: InforImageDto[]

    @Expose()
    createdAt : Date

    @Expose()
    updatedAt : Date
}