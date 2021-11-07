import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Video {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  category: number;

  @Column()
  subject: number;

  @Column()
  video_address: string;

  @Column()
  title: string;
}
