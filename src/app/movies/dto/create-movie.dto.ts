import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsNotEmpty, IsString } from "class-validator";

export class CreateMovieDto {
    @ApiProperty()
    @IsString()
    @IsDefined()
    @IsNotEmpty()
    title: string;

    @ApiProperty()
    @IsString()
    @IsDefined()
    @IsNotEmpty()
    director: string;

    @ApiProperty()
    @IsString()
    publicationDate: string;

    @ApiProperty()
    @IsString()
    @IsDefined()
    @IsNotEmpty()
    genre: string;

}
