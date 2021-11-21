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

  @Column({ nullable: false })
  subject_name: string;

  @ManyToOne(() => Category, (category) => category.subject, {
    nullable: false,
    eager: true,
  })
  @JoinColumn()
  category: Category;

  @OneToMany(() => Title, (title) => title.category, {
    nullable: false,
    eager: true,
  })
  @JoinColumn()
  title: Title[];
}
