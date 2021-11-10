import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class FixLastVideo {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsNumber()
  @IsNotEmpty()
  last_video: number;
}
