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
import { LoginRequest } from './dto/request/LoginRequest.dto';
import { UserTokenResponse } from './dto/response/UserTokenResponse.dto';
import { FixLastVideo } from './dto/request/FixLastVideo.dto';
import { Video } from '../entities/video.entity';
import { SignUpRequest } from './dto/request/SignUpRequest.dto';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Video) private videoRepository: Repository<Video>,
    private readonly jwtService: JwtService,
  ) {}

  public async SignUp(body: SignUpRequest): Promise<void> {
    if (await this.userRepository.findOne({ email: body.email })) {
      throw new BadRequestException('User Exist!');
    }
    if (body.password.indexOf(' ') !== -1) {
      throw new BadRequestException('password space Exist!');
    }

    const hashedPassword = await hash(body.password, 12);
    await this.userRepository.save({
      email: body.email,
      name: body.name,
      password: hashedPassword,
    });
  }

  public async Login(body: LoginRequest): Promise<UserTokenResponse> {
    const user = await this.userRepository.findOne({ email: body.email });
    if (!user) {
      throw new NotFoundException('User Not Exist!');
    }

    if (user.password != body.password) {
      throw new BadRequestException('Password mismatch!');
    }
    const access_token = await this.jwtService.signAsync(
      {
        email: body.email,
        access_exp: moment().hour(2).format('MM/DD/HH'),
      },
      {
        secret: process.env.ACCESS_JWT,
        expiresIn: `${process.env.ACCESS_EXP}s`,
      },
    );
    return { access_token };
  }

  public async getLastVideo(header) {
    const user = await this.bearerToken(header.authorization);

    const info = await this.userRepository.findOne(
      { id: user.id },
      { relations: ['last_video'] },
    );

    return info.last_video;
  }

  public async lastVideo(body: FixLastVideo, headers): Promise<void> {
    const user = await this.bearerToken(headers.authorization);

    await this.userRepository.update(user.id, { last_video: body.last_video });
  }

  private async bearerToken(bearerToken): Promise<any> {
    return await this.jwtService.verifyAsync(bearerToken.split(' ')[1]);
  }
}
