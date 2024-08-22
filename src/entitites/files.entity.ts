import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'files'
})
export class File{

    @ApiProperty({
        description: 'uuid V4 generado por la base de datos'
    })
    @PrimaryGeneratedColumn('uuid')
    id: string

    @ApiProperty({
        description: 'Debe ser un string'
    })
    @Column()
    name: string

    @ApiProperty({
        description: 'Debe ser un string'
    })
    @Column()
    mimeType: string

    @ApiProperty({
        description: 'Buffer'
    })
    @Column({type: 'bytea'})
    data: Buffer;
}