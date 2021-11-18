import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Title } from '../entities/title.entity';
import { TitleRequest } from './dto/request/TitleRequest.dto';
import { Video } from '../entities/video.entity';
import { videoRequest } from './dto/request/VideoRequest.dto';

@Injectable()
export class VideoService {
  constructor(
    @InjectRepository(Title) private titleRepository: Repository<Title>,
    @InjectRepository(Video) private videoRepository: Repository<Video>,
  ) {}

  private readonly logger = new Logger('Video');

  public async categoryGetTitle(params: TitleRequest): Promise<Title[]> {
    return await this.titleRepository
      .createQueryBuilder('title')
      .where('title.categoryId = :id', { id: params.id })
      .select(['title.name'])
      .getMany();
    await this.logger.log('category_get Title');
  }

  public async subjectGetTitle(params: TitleRequest): Promise<Title[]> {
    return await this.titleRepository
      .createQueryBuilder('title')
      .where('title.subjectId = :id', { id: params.id })
      .select(['title.name'])
      .getMany();

    await this.logger.log('subject_get Title');
  }

  public async getVideo(params: videoRequest): Promise<Video[]> {
    return await this.videoRepository
      .createQueryBuilder('video')
      .where('video.titleId = :id', { id: params.id })
      .select(['video.id', 'video.video_name', 'video.video_url'])
      .getMany();

    await this.logger.log('Get Video');
  }
}
