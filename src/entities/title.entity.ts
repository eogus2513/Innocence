import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'tbl_title',
})
export class Title {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  category_id: number;

  @Column({ nullable: false })
  subject_id: number;
}
