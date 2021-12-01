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
import { Video } from '../entities/video.entity';
import { compare, hash } from 'bcrypt';
import { UserTokenResponse } from './dto/response/UserTokenResponse.dto';
import { SignUpRequest } from './dto/request/UserSignUpRequest.dto';
import { LoginRequest } from './dto/request/UserLoginRequest.dto';
import { FixLastVideo } from './dto/request/FixLastVideo.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Video) private videoRepository: Repository<Video>,
    private readonly jwtService: JwtService,
  ) {}

  private readonly logger = new Logger('User');

  public async SignUp({ id, name, password }: SignUpRequest): Promise<void> {
    if (await this.userRepository.findOne({ id: id })) {
      throw new BadRequestException('User Exist!');
    }

    const hashedPassword: string = await hash(password, 12);
    await this.userRepository.save({
      id: id,
      name: name,
      password: hashedPassword,
    });
    await this.logger.log('SignUp SUCCESS : ' + id);
  }

  public async Login({
    id,
    password,
  }: LoginRequest): Promise<UserTokenResponse> {
    const user: User = await this.userRepository.findOne({ id: id });
    if (!user) {
      throw new NotFoundException('User Not Exist!');
    }

    if (!(await compare(password, user.password))) {
      throw new BadRequestException('Password mismatch!');
    }
    await this.logger.log('Login SUCCESS : ' + id);
    return {
      access_token: await this.generateToken(id, 'access'),
    };
  }

  public async getLastVideo(token: string): Promise<number> {
    const user = await this.bearerToken(token);

    const info = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.last_video', 'last_video')
      .where('user.id = :id', { id: user.id })
      .getOne();

    await this.logger.log('Get last_video');

    return info.last_video;
  }

  public async lastVideo(
    { last_video }: FixLastVideo,
    token: string,
  ): Promise<void> {
    const user = await this.bearerToken(token);

    await this.userRepository.update(
      { id: user.id },
      { last_video: last_video },
    );

    await this.logger.log('Save last_video');
  }

  private async generateToken(id: string, type: string): Promise<string> {
    return this.jwtService.signAsync(
      {
        id: `${id}`,
        type: type,
      },
      {
        secret: process.env.ACCESS_JWT,
        algorithm: 'HS256',
        expiresIn: '24h',
      },
    );
  }

  private async bearerToken(bearerToken: string): Promise<any> {
    return await this.jwtService.verifyAsync(bearerToken.split(' ')[1]);
  }
}
