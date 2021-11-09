import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { VideoService } from './video.service';
import { TitleRequest } from './dto/request/TitleRequest.dto';
import { Title } from '../entities/title.entity';
import { JwtAccessGuard } from '../guard/jwt-access.guard';

@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @UseGuards(JwtAccessGuard)
  @Get('category/:id')
  public async categoryGetTitle(
    @Param() params: TitleRequest,
  ): Promise<Title[]> {
    return await this.videoService.categoryGetTitle(params);
  }

  @UseGuards(JwtAccessGuard)
  @Get('subject/:id')
  public async subjectGetTitle(
    @Param() params: TitleRequest,
  ): Promise<Title[]> {
    return await this.videoService.subjectGetTitle(params);
  }
}