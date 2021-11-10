import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Title } from './title.entity';

@Entity()
export class Video {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Title, (title) => title.id)
  @JoinColumn()
  title: Title;

  @Column({ nullable: false })
  video_name: string;

  @Column({ nullable: false })
  video_url: string;
}
