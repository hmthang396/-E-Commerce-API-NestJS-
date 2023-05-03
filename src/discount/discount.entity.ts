
import { Product } from "src/product/product.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";

@Entity({name:'discount',schema:'public'})
export class Discount{
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        nullable: false,
    })
    discount:string

    @Column({
        default:false
    })
    status : boolean

    @Column()
    beginAt : Date

    @Column()
    endAt : Date

    @OneToMany(() => Product, (Product) => Product.discount)
    products : Product[]

    @CreateDateColumn()
    createdAt : Date

    @UpdateDateColumn()
    updatedAt : Date
}

