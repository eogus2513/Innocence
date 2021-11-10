import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from '../entities/admin.entity';
import { Repository } from 'typeorm';
import { LoginRequest } from './dto/request/loginRequest.dto';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import * as moment from 'moment';
import { AdminTokenResponse } from './dto/response/AdminTokenResponse.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin) private adminRepository: Repository<Admin>,
    private readonly jwtService: JwtService,
  ) {}

  async Login(body: LoginRequest): Promise<AdminTokenResponse> {
    const admin = await this.adminRepository.findOne({ id: body.id });
    if (!admin) {
      throw new NotFoundException('User Not Exist!');
    }

    if (admin.password != body.password) {
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

//!(await compare(body.password, user.password))
