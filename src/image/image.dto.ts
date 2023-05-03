import { Expose } from "class-transformer";
import { IsBoolean, IsDate, IsDateString, IsNotEmpty, IsString } from "class-validator";
import { Color } from "src/color/color.entity";

export class createImageDto {
    @IsString()
    @Expose()
    alt: string

    @IsNotEmpty()
    @IsString()
    @Expose()
    src: string

    @IsNotEmpty()
    @Expose()
    color: Color
}
export class updateImageDto extends createImageDto { }

export class InforImageDto {
    @Expose()
    id: number

    @Expose()
    alt: string

    @Expose()
    src: string

    @Expose()
    createdAt: Date

    @Expose()
    updatedAt: Date
}