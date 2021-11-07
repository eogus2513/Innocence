import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from '../entities/admin.entity';
import { Repository } from 'typeorm';
import { LoginRequest } from './dto/request/loginRequest.dto';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import * as moment from 'moment';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin) private adminRepository: Repository<Admin>,
    private readonly jwtService: JwtService,
  ) { }

  async Login(body: LoginRequest) {
    const user = await this.adminRepository.findOne({ id: body.id });

    if (!user || !(await compare(body.password, user.password))) {
      throw new BadRequestException();
    }

    const accessToken = await this.jwtService.signAsync({
      id: body.id, access_exp: moment().hour(1).format('MM/DD/HH')
    }, {
      secret: process.env.JWT,
      expiresIn: `${process.env.ACCESS_EXP}s`
    });

    return { accessToken };
  }
}
