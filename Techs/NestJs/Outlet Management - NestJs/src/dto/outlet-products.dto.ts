import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsNumber, IsString } from "class-validator";


export class OutletProductsDto{

    @ApiProperty()
    @IsNumber()
    id?: number;
    
    @ApiProperty()
    @IsNumber()
    productId: number;

    @ApiProperty()
    @IsNumber()
    outletId: number

    @ApiProperty()
    @IsNumber()
    quantity: number;

    @ApiProperty()
    @IsString()
    status: string;
}