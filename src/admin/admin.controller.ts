import {
  Body,
  Controller,
  Headers,
  HttpCode,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminTokenResponse } from './dto/response/AdminTokenResponse.dto';
import { LoginRequest } from './dto/request/AdminloginRequest.dto';
import { addVideo } from './dto/request/addVideo.dto';
import { addTitle } from './dto/request/addTitle.dto';
import { JwtAccessGuard } from '../middleware/guard/jwt-access.guard';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('login')
  @HttpCode(200)
  public async Login(@Body() body: LoginRequest): Promise<AdminTokenResponse> {
    return await this.adminService.Login(body);
  }

  @UseGuards(JwtAccessGuard)
  @Post('add_title')
  public async addTitle(
    @Body() body: addTitle,
    @Headers() headers,
  ): Promise<void> {
    await this.adminService.addTitle(body, headers);
  }

  @UseGuards(JwtAccessGuard)
  @Post('add_video')
  public async addVideo(
    @Body() body: addVideo,
    @Headers() headers,
  ): Promise<void> {
    await this.adminService.addVideo(body, headers);
  }
}
