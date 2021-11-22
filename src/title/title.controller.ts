import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { TitleService } from './title.service';
import { JwtAccessGuard } from '../middleware/guard/jwt-access.guard';
import { TitleRequest } from '../video/dto/request/TitleRequest.dto';
import { Title } from '../entities/title.entity';

@Controller('title')
export class TitleController {
  constructor(private readonly titleService: TitleService) {}

  @UseGuards(JwtAccessGuard)
  @Get()
  public async getTitle(): Promise<Title[]> {
    return await this.titleService.getTitle();
  }

  @UseGuards(JwtAccessGuard)
  @Get('category/:id')
  public async categoryGetTitle(@Param() params: TitleRequest) {
    return await this.titleService.categoryGetTitle(params);
  }

  @UseGuards(JwtAccessGuard)
  @Get('subject/:id')
  public async subjectGetTitle(
    @Param() params: TitleRequest,
  ): Promise<Title[]> {
    return await this.titleService.subjectGetTitle(params);
  }
}
