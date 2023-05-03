
import { Customer } from "src/customer/customer.entity";
import { Like } from "src/like/like.entity";
import { Product } from "src/product/product.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'comment', schema: 'public' })
export class Comment {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "text", nullable: false})
    content: string

    @ManyToOne(() => Customer, (customer) => customer.comments)
    customer: Customer

    @ManyToOne(() => Product, (product) => product.comments)
    product: Product

    @OneToMany(() => Like, (Like) => Like.comment)
    likes: Like[]

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}

