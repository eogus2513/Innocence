import { Body, Controller, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginRequest } from '../admin/dto/request/loginRequest.dto';
import { UserTokenResponse } from './dto/response/UserTokenResponse.dto';
import { FixLastVideo } from './dto/request/FixLastVideo.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  public async Login(@Body() body: LoginRequest): Promise<UserTokenResponse> {
    return await this.userService.Login(body);
  }

  @Put('last_video')
  public async FixLastVideo(@Body() body: FixLastVideo) {
    return await this.userService.LastVideo(body);
  }
}
