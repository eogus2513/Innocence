import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Subject } from './subject.entity';
import { Video } from '../../video/entity/video.entity';
import { Category } from './category.entity';

@Entity()
export class Title {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @OneToMany(() => Video, (video) => video.title, {
    nullable: false,
    eager: true,
  })
  @ManyToOne(() => Category, (category) => category.id, {
    nullable: false,
    eager: true,
  })
  @JoinColumn()
  category: Category;

  @ManyToOne(() => Subject, (subject) => subject.id, {
    nullable: false,
    eager: true,
  })
  @JoinColumn()
  subject: Subject;
}
