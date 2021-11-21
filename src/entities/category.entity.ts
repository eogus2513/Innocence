import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Subject } from './subject.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  category_name: string;

  @OneToMany(() => Subject, (subject) => subject.category, { nullable: false })
  subject: Subject[];
}
