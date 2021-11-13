import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class addPost {
  @IsString()
  @IsNotEmpty()
  video_name: string;

  @IsString()
  @IsNotEmpty()
  video_url: string;

  @IsNumber()
  @IsNotEmpty()
  titleId: number;
}
