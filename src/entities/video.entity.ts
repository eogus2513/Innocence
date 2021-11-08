import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'tbl_video',
})
export class Video {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  title_id: number;

  @Column({ nullable: false })
  video_name: string;

  @Column({ nullable: false })
  video_url: string;
}
