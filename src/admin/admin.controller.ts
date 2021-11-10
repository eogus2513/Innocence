import { Body, Controller, Post } from '@nestjs/common';
import { AdminService } from './admin.service';
import { LoginRequest } from './dto/request/loginRequest.dto';
import { AdminTokenResponse } from './dto/response/AdminTokenResponse.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('login')
  public async Login(@Body() body: LoginRequest): Promise<AdminTokenResponse> {
    return await this.adminService.Login(body);
  }
}
