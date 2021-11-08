import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({
  name: 'tbl_admin',
})
export class Admin {
  @PrimaryColumn()
  id: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false, default: true })
  isAdmin: boolean;
}
