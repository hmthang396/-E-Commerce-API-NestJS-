import { Expose } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";

export class createBrandDto{
    @IsNotEmpty()
    @IsString()
    @Expose()
    title: string

    @IsNotEmpty()
    @IsString()
    @Expose()
    icon: string
}
export class updateBrandDto extends createBrandDto{}

export class InforBrandDto {
    @Expose()
    id: number

    @Expose()
    title: string

    @Expose()
    icon: string

    @Expose()
    createdAt : Date

    @Expose()
    updatedAt : Date
}