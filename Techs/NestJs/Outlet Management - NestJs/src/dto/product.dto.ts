import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";


export class ProductDto{

    @ApiProperty()
    @IsOptional()
    id?: number

    @ApiProperty()
    @Expose()
    @IsString()
    name: string;

    @ApiProperty()
    @Expose()
    @IsString()
    imageUrl: string

    @ApiProperty()
    @Expose()
    @IsNumber()
    price: number;

    @ApiProperty()
    @Expose()
    @IsString()
    category: string;

    @ApiProperty()
    @Expose()
    @IsString()
    description: string;

    @ApiProperty()
    @IsOptional()
    created_at?: Date;

    @ApiProperty()
    @IsOptional()
    updated_at?: Date;
}