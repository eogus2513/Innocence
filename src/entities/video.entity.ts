import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Title } from './title.entity';
import { User } from './user.entity';

@Entity()
export class Video {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, (user) => user.last_video, { nullable: false })
  @ManyToOne(() => Title, (title) => title.id, { nullable: false })
  @JoinColumn()
  title: Title;

  @Column({ nullable: false })
  video_name: string;

  @Column({ nullable: false })
  video_url: string;
}
