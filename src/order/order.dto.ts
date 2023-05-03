import { Expose, Type } from "class-transformer"
import { IsNotEmpty, IsNumber, IsString } from "class-validator"
import { InforCustomerDto } from "src/customer/customer.dto"
import { Customer } from "src/customer/customer.entity"


export class CreateOrderDto {
    code: string

    @IsNotEmpty()
    @IsNumber()
    @Expose()
    total: number

    @IsNotEmpty()
    @IsString()
    @Expose()
    status: string

    @IsNotEmpty()
    @IsString()
    @Expose()
    fullname: string

    @IsNotEmpty()
    @IsString()
    @Expose()
    address: string

    @IsNotEmpty()
    @IsString()
    @Expose()
    method: string

    @IsNotEmpty()
    @IsString()
    @Expose()
    phonenumber: string

    @IsNotEmpty()
    @Expose()
    customer: Customer
}

export class UpdateOrderDto {

    @IsNotEmpty()
    @IsNumber()
    @Expose()
    total: number

    @IsNotEmpty()
    @IsString()
    @Expose()
    status: string

    @IsNotEmpty()
    @IsString()
    @Expose()
    fullname: string

    @IsNotEmpty()
    @IsString()
    @Expose()
    address: string

    @IsNotEmpty()
    @IsString()
    @Expose()
    method: string

    @IsNotEmpty()
    @IsString()
    @Expose()
    phonenumber: string

    @IsNotEmpty()
    @Expose()
    customer: Customer
}

export class InforOrderDto {
    @Expose()
    id: number

    @Expose()
    code: string

    @Expose()
    total: number

    @Expose()
    status: string

    @Expose()
    fullname: string

    @Expose()
    address: string

    @Expose()
    method: string

    @Expose()
    phonenumber: string

    @Type(() => InforCustomerDto)
    @Expose()
    customer: InforCustomerDto

    @Expose()
    createdAt: Date

    @Expose()
    updatedAt: Date
}