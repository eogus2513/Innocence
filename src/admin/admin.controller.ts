import { Body, Controller, Post } from '@nestjs/common';
import { AdminService } from './admin.service';
import { LoginRequest } from './dto/request/loginRequest.dto';
import { SignUpRequest } from './dto/request/SignUpRequest.dto';
import { TokenResponse } from './dto/response/TokenResponse.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('login')
  public async Login(@Body() body: LoginRequest): Promise<TokenResponse> {
    return await this.adminService.Login(body);
  }

  @Post('signup')
  public async SignUp(@Body() body: SignUpRequest): Promise<void> {
    await this.adminService.SignUp(body);
  }
}
