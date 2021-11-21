import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Title } from '../../../entities/title.entity';

export class addVideo {
  @IsString()
  @IsNotEmpty()
  video_name: string;

  @IsString()
  @IsNotEmpty()
  video_url: string;

  @IsNumber()
  @IsNotEmpty()
  titleId: Title;
}
