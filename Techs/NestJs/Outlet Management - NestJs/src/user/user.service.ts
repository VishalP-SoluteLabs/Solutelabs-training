import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from 'src/dto/create-user.dto';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService { 
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto, userRole: string): Promise<User> {
    try {
      const user = this.userRepo.create(createUserDto)
      const hashPasword = await bcrypt.hash(user.password, 12);
      user.password = hashPasword;
      user.userRole = userRole;
      return this.userRepo.save(user);
    } catch (error) {
      error.statusCode = 500;
     console.log(error)
    }
  }

  async findAll(): Promise<User[]>{
    const users = await this.userRepo.find();
    if(!users){
      throw new NotFoundException('No users found!')
    }
    return users;
  }

  async findByEmail(email: string): Promise<User> {
    return this.userRepo.findOne({ where: { email } });
  }

  async findByRole(userRole: string): Promise<User> {
    return this.userRepo.findOne({ where: { userRole } });
  }

  async findById(userId: number): Promise<User> {
    return this.userRepo.findOne({ where: { id: userId } });
  }
}
