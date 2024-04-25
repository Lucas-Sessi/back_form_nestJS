import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateBookDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @IsDefined()
    title: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @IsDefined()
    author: string;

    @ApiProperty()
    @IsNumber()
    price: number;

    @ApiProperty()
    @IsString()
    @IsDefined()
    @IsNotEmpty()
    publicationDate: Date;

    @ApiProperty()
    @IsString({ each: true })
    @IsOptional()
    tags: string[];
}
