import { Expose } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";

export class createCategoryDto{
    @IsNotEmpty()
    @IsString()
    @Expose()
    title: string
}
export class updateCategoryDto extends createCategoryDto{}

export class InforCategoryDto {
    @Expose()
    id: number

    @Expose()
    title: string

    @Expose()
    createdAt : Date

    @Expose()
    updatedAt : Date
}