import {
  Body,
  Controller,
  Get,
  Headers,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { LoginRequest } from './dto/request/UserLoginRequest.dto';
import { UserTokenResponse } from './dto/response/UserTokenResponse.dto';
import { FixLastVideo } from './dto/request/FixLastVideo.dto';
import { JwtAccessGuard } from '../middleware/guard/jwt-access.guard';
import { SignUpRequest } from './dto/request/UserSignUpRequest.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  public async SignUp(@Body() body: SignUpRequest): Promise<void> {
    await this.userService.SignUp(body);
  }

  @Post('login')
  public async Login(@Body() body: LoginRequest): Promise<UserTokenResponse> {
    return await this.userService.Login(body);
  }

  @UseGuards(JwtAccessGuard)
  @Get()
  public async getLastVideo(@Headers() header) {
    return await this.userService.getLastVideo(header);
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
