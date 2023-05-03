import { Expose, Type } from "class-transformer"
import { IsNotEmpty, IsNumber, IsString } from "class-validator"
import { InforColorDto } from "src/color/color.dto"
import { Color } from "src/color/color.entity"
import { InforOrderDto } from "src/order/order.dto"
import { Order } from "src/order/order.entiry"
import { InforProductDto } from "src/product/product.dto"
import { Product } from "src/product/product.entity"

export class CreateTransactionDto {
    
    code:string

    @IsNotEmpty()
    @IsNumber()
    @Expose()
    price : number

    @IsNotEmpty()
    @IsNumber()
    @Expose()
    quanlity:number

    @IsNotEmpty()
    @IsString()
    @Expose()
    status : string

    @IsNotEmpty()
    @IsString()
    @Expose()
    size:string

    @IsNotEmpty()
    @Expose()
    order: Order

    @IsNotEmpty()
    @Expose()
    product: Product

    @IsNotEmpty()
    @Expose()
    color: Color
}

export class UpdateTransactionDto {
    @IsNotEmpty()
    @IsNumber()
    @Expose()
    price : number

    @IsNotEmpty()
    @IsNumber()
    @Expose()
    quanlity:number

    @IsNotEmpty()
    @IsString()
    @Expose()
    status : string

    @IsNotEmpty()
    @IsString()
    @Expose()
    size:string

    @IsNotEmpty()
    @Expose()
    order: Order

    @IsNotEmpty()
    @Expose()
    product: Product

    @IsNotEmpty()
    @Expose()
    color: Color
}

export class InforTransactionDto {
    
    @Expose()
    id: number

    @Expose()
    code:string

    @Expose()
    price : number

    @Expose()
    quanlity:number

    @Expose()
    status : string

    @Expose()
    size:string

    @Type(() => InforOrderDto)
    @Expose()
    order: InforOrderDto

    @Type(() => InforProductDto)
    @Expose()
    product: InforProductDto

    @Type(() => InforColorDto)
    @Expose()
    color: InforColorDto

    @Expose()
    createdAt: Date

    @Expose()
    updatedAt: Date
}