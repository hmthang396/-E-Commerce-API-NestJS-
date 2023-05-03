import { Color } from "src/color/color.entity";
import { Order } from "src/order/order.entiry";
import { Product } from "src/product/product.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";

@Entity({name:'transaction',schema:'public'})
export class Transaction{
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        nullable: false,
        unique:true
    })
    code:string

    @Column({ type: 'decimal', precision: 10, scale: 0 })
    price : number

    @Column({type: 'int'})
    quanlity:number

    @Column()
    status : string

    @Column()
    size:string

    @ManyToOne(() => Order, (order) => order.transactions)
    order: Order

    @ManyToOne(() => Product, (product) => product.transactions)
    product: Product

    @ManyToOne(() => Color, (color) => color.transactions)
    color: Color

    @CreateDateColumn()
    createdAt : Date

    @UpdateDateColumn()
    updatedAt : Date
}

