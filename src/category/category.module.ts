import { Module } from "@nestjs/common";
import { Category } from "./category.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoryController } from "./category.controller";
import { CategoryService } from "./category.service";
import { SubCategory } from "src/subcategory/subcategory.entity";
import { Product } from "src/product/product.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Category,SubCategory,Product])],
    controllers: [CategoryController],
    providers: [CategoryService],
})

export class CategoryModule { }