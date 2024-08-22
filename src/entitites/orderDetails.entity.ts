import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from './orders.entity';
import { Product } from './products.entity';
import { ApiProperty } from "@nestjs/swagger";

@Entity({
    name: 'orderDetails'
})
export class OrderDetail {

    @ApiProperty({
        description:'uuid V4 generado por la base de datos'
    })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({
        description: 'Debe ser un decimal con precision 10, scale 2',
        example: 59.99
    })
    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2
    })
    price: number;

    @OneToOne(() => Order, order => order.orderDetail)
    @JoinColumn({name: 'order_id'})
    order: Order;

    @ManyToMany(() => Product)
    @JoinTable({
        name: 'orderDetails_products',
        joinColumn:{
            name: 'product_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn:{
            name: 'orderDetail_id',
            referencedColumnName: 'id'
        }
    })
    products: Product[];
}
