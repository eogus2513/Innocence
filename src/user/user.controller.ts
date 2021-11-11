import {
  Body,
  Controller,
  Headers,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { LoginRequest } from '../admin/dto/request/loginRequest.dto';
import { UserTokenResponse } from './dto/response/UserTokenResponse.dto';
import { FixLastVideo } from './dto/request/FixLastVideo.dto';
import { JwtAccessGuard } from '../jwt/guard/jwt-access.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  public async Login(@Body() body: LoginRequest): Promise<UserTokenResponse> {
    return await this.userService.Login(body);
  }

  @UseGuards(JwtAccessGuard)
  @Put('last_video')
  public async FixLastVideo(
    @Body() body: FixLastVideo,
    @Headers() headers,
  ): Promise<void> {
    return await this.userService.lastVideo(body, headers);
  }
}
