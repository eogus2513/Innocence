import { IsString } from 'class-validator';

export class TokenResponse {
  @IsString()
  accessToken: string;

  @IsString()
  refreshToken: string;
}
