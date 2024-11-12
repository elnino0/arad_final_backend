import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Unique(["email"]) 
@Entity()
export class User {
  /**
   * this decorator will help to auto generate id for the table.
   */
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 30 })
  name: string;

  @Column({ type: 'varchar', length: 40 })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'enum', enum: ['admin', 'customer'] })
  /**
   * a - admin
   * c - customer
   */
  role: string;
}