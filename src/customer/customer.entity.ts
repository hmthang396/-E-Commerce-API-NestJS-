import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import * as bcrypt from 'bcrypt';
import { Comment } from "src/comment/comment.entity";
import { Like } from "src/like/like.entity";
import { Order } from "src/order/order.entiry";

@Entity({ name: 'customer', schema: 'public' })
export class Customer {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        nullable: false,
    })
    fullname: string

    @Column({
        nullable: false,
        unique: true
    })
    email: string

    @Column({
        nullable: false,
    })
    password: string

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }

    @Column()
    phonenumber: string

    @Column({
        default: ''
    })
    pic: string

    @OneToMany(() => Comment, (comment) => comment.customer)
    comments : Comment[]

    @OneToMany(() => Like, (Like) => Like.customer)
    likes: Like[]

    @OneToMany(() => Order, (Order) => Order.customer)
    orders: Order[]

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}