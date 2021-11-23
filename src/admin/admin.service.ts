import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from '../entities/admin.entity';
import { Connection, Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as moment from 'moment';
import { AdminTokenResponse } from './dto/response/AdminTokenResponse.dto';
import { Video } from '../entities/video.entity';
import { LoginRequest } from './dto/request/AdminloginRequest.dto';
import { addTitle } from './dto/request/addTitle.dto';
import { Title } from '../entities/title.entity';
import { addVideo } from './dto/request/addVideo.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin) private adminRepository: Repository<Admin>,
    @InjectRepository(Title) private titleRepository: Repository<Title>,
    @InjectRepository(Video) private videoRepository: Repository<Video>,
    private readonly jwtService: JwtService,
    private connection: Connection,
  ) {}

  private readonly logger = new Logger('Admin');

  public async Login(body: LoginRequest): Promise<AdminTokenResponse> {
    const admin = await this.adminRepository.findOne({ id: body.id });
    if (!admin) {
      throw new NotFoundException('User Not Exist!');
    }
    if (admin.password != body.password) {
      throw new BadRequestException('Password mismatch!');
    }
    if (admin.isAdmin != true) {
      throw new ForbiddenException();
    }

    const access_token = await this.jwtService.signAsync(
      {
        id: body.id,
        isAdmin: true,
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

  public async addTitle(body: addTitle, headers): Promise<void> {
    const admin = await this.bearerToken(headers.authorization);

    if (admin.isAdmin != true) {
      throw new ForbiddenException();
    }

    const title = await this.titleRepository
      .createQueryBuilder('title')
      .where('title.subjectId = :id', { id: body.subjectId })
      .getRawOne();

    if (!title) {
      throw new BadRequestException('Invalid subjectId value');
    }

    await this.titleRepository.save({
      name: body.name,
      category: title.category,
      subject: body.subjectId,
    });

    await this.logger.log('Add Title : ' + body.name);
  }

  public async addVideo(body: addVideo[], headers): Promise<void> {
    const admin = await this.bearerToken(headers.authorization);
    if (admin.isAdmin != true) {
      throw new ForbiddenException();
    }

    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await Promise.all(
        body.map(async (props) => {
          if (!(await this.titleRepository.findOne(props.titleId))) {
            throw new Error();
          }
          const addVideo = new Video();
          addVideo.video_name = props.video_name;
          addVideo.video_url = props.video_url;
          addVideo.title = props.titleId;

          await queryRunner.manager.save(addVideo);
          this.logger.log('Add Video : ' + props.video_name);
        }),
      );
      await queryRunner.commitTransaction();
      await this.logger.log('Finish Add Video');
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw new BadRequestException();
    } finally {
      await queryRunner.release();
    }
  }

  private async bearerToken(bearerToken): Promise<any> {
    return await this.jwtService.verifyAsync(bearerToken.split(' ')[1]);
  }
}
