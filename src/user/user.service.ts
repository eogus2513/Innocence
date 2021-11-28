import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as moment from 'moment';
import { UserTokenResponse } from './dto/response/UserTokenResponse.dto';
import { FixLastVideo } from './dto/request/FixLastVideo.dto';
import { Video } from '../entities/video.entity';
import { SignUpRequest } from './dto/request/UserSignUpRequest.dto';
import { compare, hash } from 'bcrypt';
import { LoginRequest } from './dto/request/UserLoginRequest.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Video) private videoRepository: Repository<Video>,
    private readonly jwtService: JwtService,
  ) {}

  private readonly logger = new Logger('User');

  public async SignUp(body: SignUpRequest): Promise<void> {
    if (await this.userRepository.findOne({ id: body.id })) {
      throw new BadRequestException('User Exist!');
    }

    await this.userRepository.save({
      id: body.id,
      name: body.name,
      password: await hash(body.password, 12),
    });
    await this.logger.log('SignUp SUCCESS : ' + body.id);
  }

  public async Login(body: LoginRequest): Promise<UserTokenResponse> {
    const user = await this.userRepository.findOne({ id: body.id });
    if (!user) {
      throw new NotFoundException('User Not Exist!');
    }

    if (!(await compare(body.password, user.password))) {
      throw new BadRequestException('Password mismatch!');
    }
    const access_token = await this.jwtService.signAsync(
      {
        id: body.id,
        access_exp: moment().hour(24).format('YYYY/MM/DD'),
      },
      {
        secret: process.env.ACCESS_JWT,
        expiresIn: `${process.env.ACCESS_EXP}s`,
      },
    );
    await this.logger.log('Login SUCCESS : ' + body.id);
    return { access_token };
  }

  public async getLastVideo(header): Promise<number> {
    const user = await this.bearerToken(header.authorization);

    const info = await this.userRepository.findOne(
      { id: user.id },
      {
        relations: ['last_video'],
      },
    );

    await this.logger.log('Get last_video');
    return info.last_video;
  }

  public async lastVideo(body: FixLastVideo, headers): Promise<void> {
    const user = await this.bearerToken(headers.authorization);

    await this.userRepository.update(
      { id: user.id },
      { last_video: body.last_video },
    );

    await this.logger.log('Save last_video');
  }

  private async bearerToken(bearerToken): Promise<any> {
    return await this.jwtService.verifyAsync(bearerToken.split(' ')[1]);
  }
}
