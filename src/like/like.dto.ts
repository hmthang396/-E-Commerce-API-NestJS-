import { Exclude, Expose, Type } from "class-transformer"
import { IsBoolean, IsEmail, IsNotEmpty, IsString } from "class-validator"
import { InforCommentDto } from "src/comment/comment.dto"
import { Comment } from "src/comment/comment.entity"
import { InforCustomerDto } from "src/customer/customer.dto"
import { Customer } from "src/customer/customer.entity"

export class CreateLikeDto {
    @IsNotEmpty()
    @IsBoolean()
    @Expose()
    like: boolean

    @IsNotEmpty()
    @IsBoolean()
    @Expose()
    dislike: boolean

    @IsNotEmpty()
    @Expose()
    customer: Customer

    @IsNotEmpty()
    @Expose()
    comment: Comment
}


export class UpdateLikeDto {
    @IsNotEmpty()
    @IsBoolean()
    @Expose()
    like: boolean

    @IsNotEmpty()
    @IsBoolean()
    @Expose()
    dislike: boolean

    @IsNotEmpty()
    @Expose()
    customer: Customer

    @IsNotEmpty()
    @Expose()
    comment: Comment
}

export class InforLikeDto {
    @Expose()
    id: number

    @Expose()
    like: boolean

    @Expose()
    dislike: boolean

    @Type(() => InforCustomerDto)
    @Expose()
    customer: InforCustomerDto

    @Expose()
    comment: InforCommentDto

    @Expose()
    createdAt: Date

    @Expose()
    updatedAt: Date
}