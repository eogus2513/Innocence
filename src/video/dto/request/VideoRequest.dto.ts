import { IsNotEmpty, IsNumberString } from 'class-validator';

export class videoRequest {
  @IsNumberString()
  @IsNotEmpty()
  id: number;
}
