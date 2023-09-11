import { ApiProperty } from "@nestjs/swagger";
import { Expose, Transform } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";
import { User } from "src/entity/user.entity";


export class OutletProductFilterDto{

    @ApiProperty()
    @Expose()
    @IsOptional()
    id?: number
    
    @ApiProperty()
    @Expose()
    @IsOptional()
    @IsString()
    name?: string;

    @ApiProperty()
    @Expose()
    @IsOptional()
    @IsString()
    minPrice?: string;

    @ApiProperty()
    @Expose()
    @IsOptional()
    maxPrice?: string;

    @ApiProperty()
    @Expose()
    @IsOptional()
    minQuantity?: string;

    @ApiProperty()
    @Expose()
    @IsOptional()
    maxQuantity?: string;

    @ApiProperty()
    @Expose()
    managerId: number
}