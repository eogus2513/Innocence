import {
  Column,
  Entity,
<<<<<<< HEAD
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from './category.entity';
import { Title } from './title.entity';
=======
  OneToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { Category } from './category.entity';
>>>>>>> master

@Entity()
export class Subject {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Title, (title) => title.category)
  title: Title[];

  @Column({ nullable: false })
  subject_name: string;

<<<<<<< HEAD
  @ManyToOne(() => Category, (category) => category.subject)
=======
  @OneToOne(() => Category)
>>>>>>> master
  @JoinColumn()
  category: Category;
}
