import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from './category.entity';

@Entity()
export class Subject {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  subject_name: string;

  @ManyToOne(() => Category, (category) => category.subject, {
    nullable: false,
  })
  @JoinColumn()
  category: Category;
}
