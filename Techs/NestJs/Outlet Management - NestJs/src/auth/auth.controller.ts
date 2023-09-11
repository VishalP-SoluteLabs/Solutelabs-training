import { Controller, Post, Body, HttpStatus, HttpCode } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { Serialize } from '../interceptor/serealize.interceptor';
import { UserDto } from '../dto/user.dto';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { User } from 'src/entity/user.entity';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
    ) {}

  @HttpCode(201)
  @Serialize(UserDto)
  @Post('signup')
  signup(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.authService.signup(createUserDto);
  }

  @HttpCode(200)
  @Post('login')
  signin(@Body() createUserDto: CreateUserDto): Promise<{ access_token: string }> {
    return this.authService.login(createUserDto);
  }
}
