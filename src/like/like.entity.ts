import { Customer } from "src/customer/customer.entity";
import { Comment } from "src/comment/comment.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'like', schema: 'public' })
export class Like {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    like: boolean

    @Column()
    dislike: boolean

    @ManyToOne(() => Customer, (customer) => customer.likes)
    customer: Customer

    @ManyToOne(() => Comment, (comment) => comment.likes)
    comment: Comment

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}