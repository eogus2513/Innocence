import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from './entity/admin.entity';
import { Connection, Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { AdminTokenResponse } from './dto/response/AdminTokenResponse.dto';
import { Video } from '../video/entity/video.entity';
import { LoginRequest } from './dto/request/AdminloginRequest.dto';
import { addTitle } from './dto/request/addTitle.dto';
import { Title } from '../title/entity/title.entity';
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

  public async Login({
    id,
    password,
  }: LoginRequest): Promise<AdminTokenResponse> {
    const admin: Admin = await this.adminRepository.findOne({ id: id });
    if (!admin) {
      throw new NotFoundException('User Not Exist!');
    }
    if (admin.password != password) {
      throw new BadRequestException('Password mismatch!');
    }
    if (admin.isAdmin != true) {
      throw new ForbiddenException();
    }

    await this.logger.log('Login SUCCESS : ' + id);

    return { access_token: await this.generateToken(id, 'access') };
  }

  public async addTitle({ name, subjectId }: addTitle, token): Promise<void> {
    const admin = await this.bearerToken(token);

    if (admin.isAdmin != true) {
      throw new ForbiddenException();
    }

    const subject = await this.titleRepository
      .createQueryBuilder('subject')
      .where('subject.subjectId = :id', { id: subjectId })
      .getRawOne();

    console.log();

    if (!subject) {
      throw new BadRequestException('Invalid subjectId value');
    }

    await this.titleRepository.save({
      name: name,
      category: subject.subject_categoryId,
      subject: subjectId,
    });

    await this.logger.log('Add Title : ' + name);
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

          queryRunner.manager.save(addVideo);
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

  private async generateToken(id: string, type: string): Promise<string> {
    return await this.jwtService.signAsync(
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

  private async bearerToken(bearerToken): Promise<any> {
    return await this.jwtService.verifyAsync(bearerToken.split(' ')[1]);
  }
}
