import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Title } from '../entities/title.entity';
import { Repository } from 'typeorm';
import { TitleRequest } from './dto/request/TitleRequest.dto';

@Injectable()
export class TitleService {
  constructor(
    @InjectRepository(Title) private titleRepository: Repository<Title>,
  ) {}

  private readonly logger = new Logger('Title');

  public async categoryGetTitle(params: TitleRequest): Promise<Title[]> {
    const title = await this.titleRepository
      .createQueryBuilder('title')
      .where('title.categoryId = :id', { id: params.id })
      .select(['title.id', 'title.name'])
      .getMany();

    await this.logger.log('Get Title - category');
    return title;
  }

  public async subjectGetTitle(params: TitleRequest): Promise<Title[]> {
    const title = await this.titleRepository
      .createQueryBuilder('title')
      .where('title.subjectId = :id', { id: params.id })
      .select(['title.id', 'title.name'])
      .getMany();

    await this.logger.log('Get Title - subject');
    return title;
  }

  public async getTitle(): Promise<Title[]> {
    const titles = await this.titleRepository
      .createQueryBuilder('title')
      .getMany();

    await this.logger.log('Get Title');
    return titles;
  }
}
