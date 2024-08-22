import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { OrderDetail } from './orderDetails.entity';
import { Category } from './categories.entity';
import { ApiProperty } from "@nestjs/swagger";

@Entity({
    name: 'products'
})
export class Product {

    @ApiProperty({
        description: 'uuid V4 generado por la base de datos'
    })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({
        description: 'String de máximo 50 caracteres',
        example: 'Iphone'
    })
    @Column({
        length: 50,
        unique: true
    })
    name: string;


    @ApiProperty({
        description: 'String describiendo el producto.'
    })
    @Column({
        type: 'text'
    })
    description: string;

    @ApiProperty({
        description: 'Debe ser un decimal, con precision 10, scale 2'
    })
    @Column( {
        type: 'decimal',
        precision: 10,
        scale: 2
    })
    price: number;

    @ApiProperty({
        description: 'Debe ser un número.'
    })
    @Column({
        type: 'int'
    })
    stock: number;

    @ApiProperty({
        description: 'Debe ser un string con la URL de una imagen.'
    })
    @Column({
        type:'text',
        default: 'https://img.freepik.com/vector-gratis/sello-nuevo-producto_23-2147503128.jpg'
    })
    imgUrl: string;

    @ManyToOne(() => Category, category => category.products)
    @JoinColumn({name: 'category_id'})
    category: Category;

    @ManyToMany(() => OrderDetail, orderDetail => orderDetail.products)
    orderDetails: OrderDetail[];
}
