import { ApiProperty } from "@nestjs/swagger";
import { Expose, Transform } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";


export class AdminOutletFilterDto{

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
    city?: string;

    @ApiProperty()
    @Expose()
    @IsOptional()
    @IsString()
    state?: string;

    @ApiProperty()
    @Expose()
    @IsOptional()
    @IsString()
    area?: string;

    @ApiProperty()
    @Expose()
    @IsOptional()
    @IsString()
    status?: string;

    @ApiProperty()
    @Transform(({ value }) => parseInt(value))
    @Expose()
    @IsOptional()
    opens?: number 

    @ApiProperty()
    @Transform(({ value }) => parseInt(value))
    @Expose()
    @IsOptional()
    closes?: number
}