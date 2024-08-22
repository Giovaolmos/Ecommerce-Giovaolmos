import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from './products.entity';
import { ApiProperty } from "@nestjs/swagger";

@Entity({
    name: 'categories'
})
export class Category {
    @ApiProperty({
        description: 'uuid V4 generado por la base de datos'
    })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({
        description: 'Nombre único de una categoría, máximo 50 caracteres',
        example: 'Smartphone'
    })
    @Column({
        length: 50,
        unique: true
    })
    name: string;

    @OneToMany(() => Product, product => product.category)
    @JoinColumn()
    products: Product[];
}
