import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Title } from './entity/title.entity';
import { Repository } from 'typeorm';
import { TitleRequest } from './dto/request/TitleRequest.dto';

@Injectable()
export class TitleService {
  constructor(
    @InjectRepository(Title) private titleRepository: Repository<Title>,
  ) {}

  private readonly logger = new Logger('Title');

  public async categoryGetTitle({ id }: TitleRequest): Promise<Title[]> {
    return await this.titleRepository
      .createQueryBuilder('title')
      .where('title.categoryId = :id', { id: id })
      .select(['title.id', 'title.name'])
      .getMany();
  }

  public async subjectGetTitle({ id }: TitleRequest): Promise<Title[]> {
    return await this.titleRepository
      .createQueryBuilder('title')
      .where('title.subjectId = :id', { id: id })
      .select(['title.id', 'title.name'])
      .getMany();
  }

  public async getTitle(): Promise<Title[]> {
    return await this.titleRepository.createQueryBuilder('title').getMany();
  }
}
