import { IsNotEmpty, IsString } from 'class-validator';

export class UserTokenResponse {
  @IsString()
  @IsNotEmpty()
  access_token: string;
}
