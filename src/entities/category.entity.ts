import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Subject } from './subject.entity';
import { Title } from './title.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Subject, (subject) => subject.category, { nullable: false })
  subject: Subject[];

  @OneToMany(() => Title, (title) => title.category, { nullable: false })
  @Column({ nullable: false })
  category_name: string;
}
