import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Title } from './title.entity';
import { User } from './user.entity';

@Entity()
export class Video {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  video_name: string;

  @Column({ nullable: false })
  video_url: string;

  @ManyToOne(() => User, (user) => user.last_video, {
    nullable: false,
    eager: true,
  })
  @ManyToOne(() => Title, (title) => title.id, { nullable: false, eager: true })
  @JoinColumn()
  title: Title;
}
