import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Category } from '../../../entities/category.entity';
import { Subject } from '../../../entities/subject.entity';

export class addTitle {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  categoryId: Category;

  @IsNumber()
  @IsNotEmpty()
  subjectId: Subject;
}
