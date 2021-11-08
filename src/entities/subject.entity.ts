import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'tbl_subject',
})
export class Subject {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  subject_name: string;

  @Column({ nullable: false })
  category_id: number;
}
