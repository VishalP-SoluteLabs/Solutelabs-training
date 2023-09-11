import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsStrongPassword({
    minLength: 6,
    minNumbers: 1,
    minLowercase: 1,
    minUppercase: 1,
    minSymbols:1
  })
  password: string;

}
