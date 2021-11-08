import { IsString } from 'class-validator';

export class TokenResponse {
  @IsString()
  access_token: string;
}
