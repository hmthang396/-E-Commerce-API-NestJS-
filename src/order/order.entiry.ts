import { Customer } from "src/customer/customer.entity"
import { Transaction } from "src/transaction/transaction.entity"
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

@Entity({ name: 'order', schema: 'public' })
export class Order {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        nullable: false,
        unique: true
    })
    code: string

    @Column({ type: 'decimal', precision: 10, scale: 0 })
    total: number

    @Column({
        nullable: false,
    })
    status: string

    @Column({ nullable: false })
    fullname: string

    @Column({ nullable: false })
    address: string

    @Column({ nullable: false })
    method: string

    @Column({ nullable: false })
    phonenumber: string

    @ManyToOne(() => Customer, (customer) => customer.orders)
    customer: Customer

    @OneToMany(() => Transaction, (transaction) => transaction.order)
    transactions: Transaction[]

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}