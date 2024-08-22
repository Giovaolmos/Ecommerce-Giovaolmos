import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Order } from './orders.entity';
import { ApiProperty } from "@nestjs/swagger";

@Entity({
    name: 'users',
})
export class User {

    @ApiProperty({
        description: 'uuid V4 generado por la base de datos'
    })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({
        description: 'String de máximo 80 caracteres',
        example: 'Giovanni Olmos'
    })
    @Column({
        length: 80
    })
    name: string;

    @ApiProperty({
        description: 'String de máximo 50 caracteres con formato de email',
        example: 'email@example.com'
    })
    @Column({
        length: 50,
        unique: true
    })
    email: string;

    @ApiProperty({
        description: 'Se hasheara la password desde el backend',
    })
    @Column({
        length: 120
    })
    password: string;

    @ApiProperty({
        description: 'Debe ser un número.',
        example: 123456789
    })
    @Column({
        type: "int"
    })
    phone: number;
    

    @ApiProperty({
        description: 'String de máximo 50 caracteres.',
        example: 'Test Country'
    })
    @Column({
        length: 50
    })
    country: string;

    @ApiProperty({
        description: 'Debe ser un string',
        example: 'Calle falsa 12345'
    })
    @Column({
        type: 'text'
    })
    address: string;

    @ApiProperty({
        description: 'String de máximo 50 caracteres',
        example: 'Ciudad Falsa'
    })
    @Column({
        length: 50
    })
    city: string;

    @ApiProperty({
        description: 'Siempre que se cree un usuario isAdmin vendrá en false',
    })
    @Column({
        default: false
    })
    isAdmin?: boolean

    @OneToMany(() => Order, order => order.user)
    @JoinColumn({name: 'order_id'})
    orders: Order[];

    @Column({
        nullable: true
    })
    birthdate: Date
}
 