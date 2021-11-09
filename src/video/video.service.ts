import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
<<<<<<< HEAD
import { Repository } from 'typeorm';
import { Title } from '../entities/title.entity';
import { TitleRequest } from './dto/request/TitleRequest.dto';
=======
import { Video } from '../entities/video.entity';
import { Repository } from 'typeorm';
>>>>>>> master

@Injectable()
export class VideoService {
  constructor(
<<<<<<< HEAD
    @InjectRepository(Title) private titleRepository: Repository<Title>,
  ) {}

  public async categoryGetTitle(params: TitleRequest): Promise<Title[]> {
    return await this.titleRepository
      .createQueryBuilder('title')
      .where('title.categoryId = :id', { id: params.id })
      .select(['title.name'])
      .getMany();
  }

  public async subjectGetTitle(params: TitleRequest): Promise<Title[]> {
    return await this.titleRepository
      .createQueryBuilder('title')
      .where('title.subjectId = :id', { id: params.id })
      .select(['title.name'])
      .getMany();
  }
=======
    @InjectRepository(Video) private videoRepository: Repository<Video>,
  ) {}
>>>>>>> master
}
