
import { Brand } from "src/brand/brand.entity";
import { Product } from "src/product/product.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'collection', schema: 'public' })
export class Collection {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        nullable: false,
    })
    title: string

    @ManyToOne(() => Brand, (brand) => brand.collections)
    brand: Brand

    @OneToMany(() => Product, (Product) => Product.collection)
    products : Product[]

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}