import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from '../entities/admin.entity';
import { Repository } from 'typeorm';
import { LoginRequest } from './dto/request/loginRequest.dto';
import { compare, hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import * as moment from 'moment';
import { SignUpRequest } from './dto/request/SignUpRequest.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin) private adminRepository: Repository<Admin>,
    private readonly jwtService: JwtService,
  ) {}

  async Login(body: LoginRequest) {
    const user = await this.adminRepository.findOne({ id: body.id });

    if (!user || !(await compare(body.password, user.password))) {
      throw new BadRequestException();
    }

    const accessToken = await this.jwtService.signAsync(
      {
        id: body.id,
        access_exp: moment().hour(2).format('MM/DD/HH'),
      },
      {
        secret: process.env.JWT,
        expiresIn: `${process.env.ACCESS_EXP}s`,
      },
    );
    const refreshToken = await this.jwtService.signAsync(
      {
        id: body.id,
        refresh_exp: moment().day(14).format('YYYY/MM/DD'),
      },
      {
        secret: process.env.REFRESH_JWT,
        expiresIn: `${process.env.REFRESH_EXP}s`,
      },
    );

    return { accessToken, refreshToken };
  }

  async SignUp(body: SignUpRequest): Promise<void> {
    if (await this.adminRepository.findOne({ id: body.id })) {
      throw new BadRequestException();
    }

    await this.adminRepository.save({
      id: body.id,
      name: body.name,
      password: await hash(body.password, 12),
    });
  }
}
