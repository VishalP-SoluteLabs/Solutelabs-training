import { BadRequestException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { compare } from 'bcrypt'
import { CreateUserDto } from "../dto/create-user.dto";
import { UserService } from "src/user/user.service";
import { role } from "src/util/constant.util";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { User } from "src/entity/user.entity";

@Injectable()
export class AuthService{
    constructor(
      private readonly userService: UserService,
      private readonly jwtService: JwtService,
      private readonly configService: ConfigService
      ){}

    async signup(createUserDto: CreateUserDto): Promise<User>{
      let user = await this.userService.findByEmail(createUserDto.email);
      if(user){
        throw new BadRequestException('Email already exixts.!!')
      }
        let userRole = role.OUTLET_MANAGER;
        let users = await this.userService.findAll();
        if (users.length == 0) {
          userRole = role.ADMIN;
        } else {
          const Admin = this.userService.findByRole(role.ADMIN);
          if (!Admin) {
            userRole = role.ADMIN;
          }
        }
        
        return this.userService.createUser(createUserDto, userRole);
    }

    async login(createUserDto: CreateUserDto): Promise<{ access_token: string }> { 
      const user = await this.userService.findByEmail(createUserDto.email);
    if (!user) {
      throw new UnauthorizedException('user with this Email does not exist');
    }
   
    const isEqual = await  compare(createUserDto.password, user.password.trim());

    if (!isEqual) {
      throw new UnauthorizedException('Wrong Password');
    }
    return this.signToken(user.id, user.email);
  }

  async signToken(
    userId: number,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };
    const secret = this.configService.get<string>('JWT_SECRET_KEY');
    const token = await this.jwtService.signAsync(payload, {
      expiresIn: '1h',
      secret: secret,
    });
    return {
      access_token: token,
    };
  }
}


