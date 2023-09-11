import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UserDto {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  email: string;

  @ApiProperty()
  @Expose()
  userRole: string;

  @ApiProperty()
  @Expose()
  created_at: Date;

  @ApiProperty()
  @Expose()
  updated_at: Date;
}
