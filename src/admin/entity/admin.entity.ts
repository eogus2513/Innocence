import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Admin {
  @PrimaryColumn()
  id: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false, default: true })
  isAdmin: boolean;
}
