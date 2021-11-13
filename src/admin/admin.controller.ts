import { Body, Controller, Headers, Post } from '@nestjs/common';
import { AdminService } from './admin.service';
import { LoginRequest } from './dto/request/loginRequest.dto';
import { AdminTokenResponse } from './dto/response/AdminTokenResponse.dto';
import { addPost } from './dto/request/addPost.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('login')
  public async Login(@Body() body: LoginRequest): Promise<AdminTokenResponse> {
    return await this.adminService.Login(body);
  }

  @Post('add')
  public async addPost(@Body() body: addPost, @Headers() headers) {
    return await this.adminService.addPost(body, headers);
  }
}
