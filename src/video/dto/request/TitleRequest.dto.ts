import { IsNotEmpty, IsNumberString } from 'class-validator';

export class TitleRequest {
  @IsNumberString()
  @IsNotEmpty()
  id: number;
}
