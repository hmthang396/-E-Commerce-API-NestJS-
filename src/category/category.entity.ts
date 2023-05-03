import { Product } from "src/product/product.entity";
import { SubCategory } from "src/subcategory/subcategory.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";

@Entity({name:'category',schema:'public'})
export class Category{
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        nullable: false,
        unique: true
    })
    title:string

    @OneToMany(() => SubCategory, (SubCategory) => SubCategory.category)
    subcategories : SubCategory[]

    @OneToMany(() => Product, (Product) => Product.category)
    products : Product[]

    @CreateDateColumn()
    createdAt : Date

    @UpdateDateColumn()
    updatedAt : Date
}

