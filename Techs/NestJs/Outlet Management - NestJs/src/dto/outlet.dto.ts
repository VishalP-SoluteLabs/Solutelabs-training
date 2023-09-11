import { ApiProperty } from "@nestjs/swagger";
import { Expose, Transform } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";


export class OutletDto{

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    id?: number

    @ApiProperty()
    @Expose()
    @IsString()
    name: string;

    @ApiProperty()
    @Expose()
    @IsString()
    city: string;

    @ApiProperty()
    @Expose()
    @IsString()
    state: string;

    @ApiProperty()
    @Expose()
    @IsString()
    area: string;

    @ApiProperty()
    @Expose()
    @IsString()
    status: string;

    @ApiProperty()
    @Expose()
    @IsNumber()
    opens: number

    @ApiProperty()
    @Expose()
    @IsNumber() 
    closes: number

   // @Transform(({ obj }) => obj.managerId) 
    @ApiProperty()
    managerId?: number

}