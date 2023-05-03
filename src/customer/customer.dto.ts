import { Exclude, Expose, Type } from "class-transformer"
import { IsEmail, IsNotEmpty, IsString } from "class-validator"
import { InforOrderDto } from "src/order/order.dto"
import { Order } from "src/order/order.entiry"


export class CreateCustomerDto {
    @IsNotEmpty()
    @IsString()
    @Expose()
    fullname: string

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    @Expose()
    email: string

    @IsNotEmpty()
    @IsString()
    @Expose()
    password: string

    @IsNotEmpty()
    @IsString()
    @Expose()
    phonenumber: string

    @IsNotEmpty()
    @IsString()
    @Expose()
    pic: string
}

export class UpdateCustomerDto {

    @IsNotEmpty()
    @IsString()
    @Expose()
    fullname: string

    @IsNotEmpty()
    @IsString()
    @Expose()
    password: string

    @IsNotEmpty()
    @IsString()
    @Expose()
    pic: string
}

export class InforCustomerDto {
    @Expose()
    id:number

    @Expose()
    fullname: string

    @Expose()
    email: string

    @Expose()
    pic: string

    @Expose()
    phonenumber: string

    @Type(() => InforOrderDto)
    @Expose()
    orders: InforOrderDto[]

    @Expose()
    createdAt : Date

    @Expose()
    updatedAt : Date
}