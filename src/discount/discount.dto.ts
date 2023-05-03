import { Expose } from "class-transformer";
import { IsBoolean, IsDate, IsDateString, IsNotEmpty, IsString } from "class-validator";

export class createDiscountDto{
    @IsNotEmpty()
    @IsString()
    @Expose()
    discount:string

    @IsNotEmpty()
    @IsBoolean()
    @Expose()
    status : boolean

    @IsNotEmpty()
    @IsDateString()
    @Expose()
    beginAt : Date

    @IsNotEmpty()
    @IsDateString()
    @Expose()
    endAt : Date

}
export class updateDiscountDto extends createDiscountDto{}

export class InforDiscountDto {
    @Expose()
    id: number

    @Expose()
    discount:string

    @Expose()
    status : boolean

    @Expose()
    beginAt : Date

    @Expose()
    endAt : Date

    @Expose()
    createdAt : Date

    @Expose()
    updatedAt : Date
}