import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from './category.entity';
import { Title } from './title.entity';

@Entity()
export class Subject {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Title, (title) => title.category, { nullable: false })
  @JoinColumn()
  title: Title[];

  @Column({ nullable: false })
  subject_name: string;

  @ManyToOne(() => Category, (category) => category.subject, {
    nullable: false,
  })
  @JoinColumn()
  category: Category;
}
