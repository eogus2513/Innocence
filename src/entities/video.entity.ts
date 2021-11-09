import { Column, Entity, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Title } from './title.entity';

@Entity()
export class Video {
  @PrimaryGeneratedColumn()
  id: number;

<<<<<<< HEAD
  @JoinColumn()
  title: Title;
=======
  @Column({ nullable: false })
  title: number;
>>>>>>> master

  @Column({ nullable: false })
  video_name: string;

  @Column({ nullable: false })
  video_url: string;
}
