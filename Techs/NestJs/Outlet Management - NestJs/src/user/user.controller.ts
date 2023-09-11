import { Controller, Get, HttpCode, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/decorator/get-user.decorator';
import { JwtGuard } from 'src/guards/jwt.guard';
import { User } from '../entity/user.entity';
import { Serialize } from 'src/interceptor/serealize.interceptor';
import { UserDto } from 'src/dto/user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@UseGuards(JwtGuard)
@ApiTags('User-Api')
@ApiBearerAuth('access-token')
@Serialize(UserDto)   //Serialize interceptor to convert UserEntity to UserDto
@Controller('user')
export class UserController {
  
  
  @HttpCode(200)
  @Get('me')
  getMe(@GetUser() user: User): User {
    return user;
  }
}
