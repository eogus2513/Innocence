import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from '../entities/admin.entity';
import { Connection, Repository } from 'typeorm';
import { LoginRequest } from './dto/request/loginRequest.dto';
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
    private connection: Connection,
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
      throw new ForbiddenException();
    }

    const addVideo = new Video();
    addVideo.video_name = body.video_name;
    addVideo.video_url = body.video_url;
    addVideo.title = body.titleId;
    await this.connection.manager.save(addVideo);
  }

  private async bearerToken(bearerToken): Promise<any> {
    return await this.jwtService.verifyAsync(bearerToken.split(' ')[1]);
  }
}
