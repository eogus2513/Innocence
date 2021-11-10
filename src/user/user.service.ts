import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as moment from 'moment';
import { LoginRequest } from './dto/request/loginRequest.dto';
import { UserTokenResponse } from './dto/response/UserTokenResponse.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  public async Login(body: LoginRequest): Promise<UserTokenResponse> {
    const user = await this.userRepository.findOne(body.id);
    if (!user) {
      throw new NotFoundException('User Not Exist!');
    }

    if (user.password != body.password) {
      throw new BadRequestException('Password mismatch!');
    }
    const access_token = await this.jwtService.signAsync(
      {
        id: body.id,
        access_exp: moment().hour(2).format('MM/DD/HH'),
      },
      {
        secret: process.env.ACCESS_JWT,
        expiresIn: `${process.env.ACCESS_EXP}s`,
      },
    );

    return { access_token };
  }
}
