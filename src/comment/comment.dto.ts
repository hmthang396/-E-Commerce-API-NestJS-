import { Expose, Type } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";
import { InforCustomerDto } from "src/customer/customer.dto";
import { Customer } from "src/customer/customer.entity";
import { InforLikeDto } from "src/like/like.dto";
import { InforProductDto } from "src/product/product.dto";
import { Product } from "src/product/product.entity";

export class createCommentDto {
    @IsString()
    @Expose()
    content: string

    @IsNotEmpty()
    @Expose()
    customer: Customer

    @IsNotEmpty()
    @Expose()
    product: Product

}
export class updateCommentDto extends createCommentDto { }

export class InforCommentDto {
    @Expose()
    id: number

    @Expose()
    content: string

    @Type(() => InforCustomerDto)
    @Expose()
    customer: InforCustomerDto

    @Expose()
    product: InforProductDto

    @Type(() => InforLikeDto)
    @Expose()
    likes: InforLikeDto[]

    @Expose()
    createdAt: Date

    @Expose()
    updatedAt: Date
}