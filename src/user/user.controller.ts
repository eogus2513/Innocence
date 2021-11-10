import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginRequest } from '../admin/dto/request/loginRequest.dto';
import { UserTokenResponse } from './dto/response/UserTokenResponse.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  public async Login(@Body() body: LoginRequest): Promise<UserTokenResponse> {
    return await this.userService.Login(body);
  }
}
