import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubCategory } from "./subcategory.entity";
import { SubCategoryController } from "./subcategory.controller";
import { SubCategoryService } from "./subcategory.service";
import { Category } from "src/category/category.entity";
import { Product } from "src/product/product.entity";

@Module({
    imports: [TypeOrmModule.forFeature([SubCategory,Category,Product])],
    controllers: [SubCategoryController],
    providers: [SubCategoryService],
})

export class SubCategoryModule { }