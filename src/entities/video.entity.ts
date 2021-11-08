import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'tbl_video',
})
export class Video {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  category: number;

  @Column({ nullable: false })
  subject: number;

  @Column({ nullable: false })
  video_address: string;

  @Column({ nullable: false })
  title: string;
}
