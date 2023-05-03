import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { Collection } from "src/collection/collection.entity";
import { Product } from "src/product/product.entity";
@Entity({ name: 'brand', schema: 'public' })
export class Brand {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        nullable: false,
        unique: true
    })
    title: string

    @Column()
    icon: string

    @OneToMany(() => Collection, (Collection) => Collection.brand)
    collections : Collection[]

    @OneToMany(() => Product, (Product) => Product.brand)
    products : Product[]

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}
