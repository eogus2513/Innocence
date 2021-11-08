import {
  BadRequestException,
  CACHE_MANAGER,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from '../entities/admin.entity';
import { Repository } from 'typeorm';
import { LoginRequest } from './dto/request/loginRequest.dto';
import { compare, hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import * as moment from 'moment';
import { SignUpRequest } from './dto/request/SignUpRequest.dto';
import { TokenResponse } from './dto/response/TokenResponse.dto';
import { Cache } from 'cache-manager';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin) private adminRepository: Repository<Admin>,
    private readonly jwtService: JwtService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async Login(body: LoginRequest): Promise<TokenResponse> {
    const user = await this.adminRepository.findOne({ id: body.id });

    if (!user) {
      throw new NotFoundException('User Not Exist!');
    }
    if (!(await compare(body.password, user.password))) {
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
    const refresh_token = await this.jwtService.signAsync(
      {
        id: body.id,
        refresh_exp: moment().day(14).format('YYYY/MM/DD'),
      },
      {
        secret: process.env.REFRESH_JWT,
        expiresIn: `${process.env.REFRESH_EXP}s`,
      },
    );
    await this.cacheManager.set(body.id, refresh_token);
    return { access_token, refresh_token };
  }

  async SignUp(body: SignUpRequest): Promise<void> {
    if (await this.adminRepository.findOne({ id: body.id })) {
      throw new BadRequestException('User Exist!');
    }

    await this.adminRepository.save({
      id: body.id,
      name: body.name,
      password: await hash(body.password, 12),
    });
  }
}
