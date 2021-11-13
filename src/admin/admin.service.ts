import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from '../entities/admin.entity';
import { Repository } from 'typeorm';
import { LoginRequest } from './dto/request/loginRequest.dto';
//import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import * as moment from 'moment';
import { AdminTokenResponse } from './dto/response/AdminTokenResponse.dto';
import { Video } from '../entities/video.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin) private adminRepository: Repository<Admin>,
    @InjectRepository(Video) private videoRepository: Repository<Video>,
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
    if (admin.isAdmin != true) {
      throw new BadRequestException();
    }

    const access_token = await this.jwtService.signAsync(
      {
        id: body.id,
        isAdmin: true,
        access_exp: moment().hour(2).format('MM/DD/HH'),
      },
      {
        secret: process.env.ACCESS_JWT,
        expiresIn: `${process.env.ACCESS_EXP}s`,
      },
    );

    return { access_token };
  }

  public async addPost(body, headers) {
    const admin = await this.bearerToken(headers.authorization);

    if (admin.isAdmin != true) {
      throw new UnauthorizedException();
    }

    return await this.videoRepository.save({
      video_name: body.video_name,
      video_url: body.video_url,
      titleId: body.titleId,
    });
  }

  private async bearerToken(bearerToken): Promise<any> {
    return await this.jwtService.verifyAsync(bearerToken.split(' ')[1]);
  }
}

//!(await compare(body.password, user.password))
