import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from './users.entity';
import { OrderDetail } from './orderDetails.entity';
import { ApiProperty } from "@nestjs/swagger";

@Entity({
    name: 'orders'
})
export class Order {

    @ApiProperty({
        description: 'uuid V4 generado por la base de datos'
    })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({
        description: 'uuid V4 generado por la base de datos'
    }) 
    @ManyToOne(() => User, user => user.orders)
    @JoinColumn({name: 'user_id'})
    user: User;

    @ApiProperty({
        description: 'Debe ingresar una fecha con formato dd/mm/yy',
        example: '02/07/2024',
    })
    @Column()
    date: Date;

    @OneToOne(() => OrderDetail, orderDetail => orderDetail.order)
    orderDetail: OrderDetail;
}
