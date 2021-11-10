import { IsNotEmpty, IsNumber } from 'class-validator';

export class FixLastVideo {
  @IsNumber()
  @IsNotEmpty()
  last_video: number;
}
