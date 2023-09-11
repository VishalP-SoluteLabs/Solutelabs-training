import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";


export class OutletStatusDto{

    @ApiProperty()
    @IsString()
    status: string
}