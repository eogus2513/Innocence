import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Video } from './video.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  uid: number;

  @Column({ nullable: false })
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  password: string;

  @OneToOne(() => Video, (video) => video.id, { nullable: true })
  @JoinColumn()
  last_video: number;
}
