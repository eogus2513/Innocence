import { IsNotEmpty, IsString } from 'class-validator';

export class TokenResponse {
  @IsString()
  @IsNotEmpty()
  access_token: string;
}
