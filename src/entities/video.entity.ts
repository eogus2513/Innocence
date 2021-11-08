import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from './category.entity';

@Entity({
  name: 'tbl_video',
})
export class Video {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  category: Category;

  @Column({ nullable: false })
  subject: number;

  @Column({ nullable: false })
  video_address: string;

  @Column({ nullable: false })
  title: string;
}
