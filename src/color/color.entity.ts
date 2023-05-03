import { Image } from "src/image/image.entity"
import { Product } from "src/product/product.entity"
import { Transaction } from "src/transaction/transaction.entity"
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
@Entity({ name: 'color', schema: 'public' })
export class Color {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    color: string

    @Column()
    stock: number

    @Column({ type: 'decimal', precision: 10, scale: 0 })
    price: number

    @OneToMany(() => Transaction, (Transaction) => Transaction.color)
    transactions: Transaction[]

    @ManyToOne(() => Product, (Product) => Product.colors)
    product: Product

    @OneToMany(() => Image, (Image) => Image.color)
    images: Image[]

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}
