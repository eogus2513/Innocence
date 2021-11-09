import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from './category.entity';
import { Subject } from './subject.entity';

@Entity()
export class Title {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @ManyToOne(() => Category, (category) => category.category_name)
  @JoinColumn()
  category: Category;

  @ManyToOne(() => Subject, (subject) => subject.subject_name)
  @JoinColumn()
  subject: Subject;
}
