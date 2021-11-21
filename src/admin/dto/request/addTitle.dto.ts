import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Subject } from '../../../entities/subject.entity';

export class addTitle {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  subjectId: Subject;
}
