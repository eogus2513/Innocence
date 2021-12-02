import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { VideoService } from './video.service';
import { JwtAccessGuard } from '../middleware/guard/jwt-access.guard';
import { Video } from './entity/video.entity';
import { videoRequest } from './dto/request/VideoRequest.dto';

@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @UseGuards(JwtAccessGuard)
  @Get('/:id')
  public async getVideo(@Param() params: videoRequest): Promise<Video[]> {
    return await this.videoService.getVideo(params);
  }
}
