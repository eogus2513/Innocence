import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from './category.entity';
import { Subject } from './subject.entity';
import { Video } from './video.entity';

@Entity()
export class Title {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @OneToMany(() => Video, (video) => video.title)
  @ManyToOne(() => Category, (category) => category.category_name)
  @JoinColumn()
  category: Category;

  @ManyToOne(() => Subject, (subject) => subject.subject_name)
  @JoinColumn()
  subject: Subject;
}
