import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
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

  @OneToOne(() => Category)
  @JoinColumn()
  category: Category;

  @OneToOne(() => Subject)
  @JoinColumn()
  subject: Subject;
}
