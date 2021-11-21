import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Subject } from './subject.entity';
import { Video } from './video.entity';

@Entity()
export class Title {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @OneToMany(() => Video, (video) => video.title, { nullable: false })
  @ManyToOne(() => Subject, (subject) => subject.subject_name, {
    nullable: false,
  })
  @JoinColumn()
  subject: Subject;
}
