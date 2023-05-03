
import { Color } from "src/color/color.entity";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'image', schema: 'public' })
export class Image {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    alt: string

    @Column({
        type:"text"
    })
    src: string

    @ManyToOne(() => Color, (Color) => Color.images)
    color: Color

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}

