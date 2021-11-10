import { IsNotEmpty, IsString } from 'class-validator';

export class AdminTokenResponse {
  @IsString()
  @IsNotEmpty()
  access_token: string;
}
