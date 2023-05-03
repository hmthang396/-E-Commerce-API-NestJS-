
import { IsBoolean, IsEmail, IsEnum, IsNotEmpty,IsNumber,IsString, } from "class-validator"
import { AccountPosition } from "./account.entity"
import { Expose } from "class-transformer"

export class CreateAccountDto {
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
    @IsEnum(AccountPosition)
    @Expose()
    position: AccountPosition

    @IsNotEmpty()
    @IsString()
    @Expose()
    pic: string

    @IsNotEmpty()
    @IsBoolean()
    @Expose()
    create: boolean

    @IsNotEmpty()
    @IsBoolean()
    @Expose()
    update: boolean

    @IsNotEmpty()
    @IsBoolean()
    @Expose()
    delete: boolean

    @IsNotEmpty()
    @IsBoolean()
    @Expose()
    addDiscount: boolean
}

export class UpdateAccountDto {

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

export class InforAccountDto {
    @Expose()
    id:number

    @Expose()
    fullname: string

    @Expose()
    email: string

    @Expose()
    position: AccountPosition

    @Expose()
    pic: string

    @Expose()
    create: boolean

    @Expose()
    update: boolean

    @Expose()
    delete: boolean

    @Expose()
    addDiscount: boolean

    @Expose()
    createdAt : Date

    @Expose()
    updatedAt : Date
}

export class SignInAccountDto {
    @Expose()
    id:number

    @Expose()
    fullname: string

    @Expose()
    email: string

    @Expose()
    password: string

    @Expose()
    position: AccountPosition

    @Expose()
    pic: string

    @Expose()
    create: boolean

    @Expose()
    update: boolean

    @Expose()
    delete: boolean

    @Expose()
    addDiscount: boolean

    @Expose()
    createdAt : Date

    @Expose()
    updatedAt : Date
}