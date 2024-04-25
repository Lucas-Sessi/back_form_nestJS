import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserEntity {
    @ApiProperty({ example: 1 })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ example: 'Lucas' })
    @Column()
    nome: string;

    @ApiProperty({ example: 'Sessi' })
    @Column()
    sobrenome: string;

    @ApiProperty({ example: 'lucas.sessi@gmail.com'})
    @Column()
    email: string;

    @ApiProperty({ example: 'senha123' })
    @Column()
    password: string;
}
