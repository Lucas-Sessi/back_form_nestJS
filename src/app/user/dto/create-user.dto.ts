import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDtoInput {
    @ApiProperty({ example: 'Lucas' })
    @IsString()
    @IsDefined()
    @IsNotEmpty()
    nome: string;
    
    @ApiProperty({ example: 'Sessi' })
    @IsString()
    @IsDefined()
    @IsNotEmpty()
    sobrenome: string;

    @ApiProperty({ example: 'lucas.sessi@gmail.com' })
    @IsEmail()
    @IsDefined()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ example: 'senha123' })
    @IsString()
    @IsDefined()
    @IsNotEmpty()
    password: string;
}
