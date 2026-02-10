import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepositor: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    try {
      const { password, ...userData } = createUserDto;

      const savedUser = this.userRepositor.create({
        ...userData,
        password: bcrypt.hashSync(password, 10),
      });

      await this.userRepositor.save(savedUser);
      const { password: _, ...restUser } = savedUser;
      return restUser;
    } catch (error) {
      this.handleDbErrors(error);
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const { password, email } = loginUserDto;
    const user = await this.userRepositor.findOne({
      where: { email },
      select: { email: true, password: true },
    });

    if (!user) throw new UnauthorizedException('Not valid Credentials (email)');

    if (!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException('Not valid Credentials (password)');
    //TODO: return JWT to Acces
    return user;
  }
  private handleDbErrors(error: any): never {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    console.log(error);

    throw new InternalServerErrorException('Please check server logs');
  }
}
