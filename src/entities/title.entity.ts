import {
  Column,
  Entity,
  JoinColumn,
<<<<<<< HEAD
  ManyToOne,
=======
  OneToOne,
>>>>>>> master
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

<<<<<<< HEAD
  @ManyToOne(() => Category, (category) => category.category_name)
  @JoinColumn()
  category: Category;

  @ManyToOne(() => Subject, (subject) => subject.subject_name)
=======
  @OneToOne(() => Category)
  @JoinColumn()
  category: Category;

  @OneToOne(() => Subject)
>>>>>>> master
  @JoinColumn()
  subject: Subject;
}
