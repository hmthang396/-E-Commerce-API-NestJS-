import { Category } from "src/category/category.entity";
import { Product } from "src/product/product.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'subcategory', schema: 'public' })
export class SubCategory {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        nullable: false,
        unique: true
    })
    title: string

    @ManyToOne(() => Category, (Category) => Category.subcategories)
    category: Category

    @OneToMany(() => Product, (Product) => Product.subcategory)
    products : Product[]

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}
