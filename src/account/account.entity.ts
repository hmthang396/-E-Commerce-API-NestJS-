import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import * as bcrypt from 'bcrypt';

export enum AccountPosition {
    Administrator = "Administrator",
    Customer = "Customer",
    Manager = "Manager",
}

@Entity({ name: 'account', schema: 'public' })
export class Account {
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

    @Column({
        type: "enum",
        enum: AccountPosition,
        default: AccountPosition.Customer,
    })
    position: AccountPosition

    @Column({
        default: ''
    })
    pic: string

    @Column({
        default: false
    })
    create: boolean

    @Column({
        default: false
    })
    update: boolean

    @Column({
        default: false
    })
    delete: boolean

    @Column({
        default: false
    })
    addDiscount: boolean

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}