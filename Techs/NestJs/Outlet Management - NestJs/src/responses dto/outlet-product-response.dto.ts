import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsNumber, IsString } from "class-validator";


export class OutletProductsResponseDto{

    @ApiProperty()
    @Expose()
    @IsNumber()
    productId: number;

    @ApiProperty()
    @Expose()
    @IsNumber()
    quantity: number;

    @ApiProperty()
    @Expose()
    @IsString()
    status: string;
}