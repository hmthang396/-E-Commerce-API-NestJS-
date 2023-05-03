
import { Brand } from "src/brand/brand.entity";
import { Category } from "src/category/category.entity";
import { Collection } from "src/collection/collection.entity";
import { Color } from "src/color/color.entity";
import { Comment } from "src/comment/comment.entity";
import { Discount } from "src/discount/discount.entity";
import { SubCategory } from "src/subcategory/subcategory.entity";
import { Transaction } from "src/transaction/transaction.entity";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";

@Entity({ name: 'product', schema: 'public' })
export class Product {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        nullable: false,
    })
    title: string

    @Column({ type: "text" })
    description: string

    @Column()
    type: string

    @Column({
        default: false,
    })
    status: boolean

    @Column({
        default: false,
    })
    isNew: boolean

    @ManyToOne(() => Brand, (brand) => brand.products)
    brand: Brand

    @ManyToOne(() => Category, (category) => category.products)
    category: Category

    @ManyToOne(() => Collection, (collection) => collection.products)
    collection: Collection

    @ManyToOne(() => Discount, (discount) => discount.products)
    discount: Discount

    @ManyToOne(() => SubCategory, (subCategory) => subCategory.products)
    subcategory: SubCategory

    @OneToMany(() => Comment, (comment) => comment.product)
    comments: Comment[]

    @OneToMany(() => Transaction, (Transaction) => Transaction.product)
    transactions: Transaction[]
    //
    @OneToMany(() => Color, (Color) => Color.product)
    colors: Color[]
    //
    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}

