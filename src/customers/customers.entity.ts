

import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Purchases } from 'src/purchases/purchases.entity';

@Entity()
export class Customers {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  join: string;

  @OneToMany(type => Purchases, project => project.customer) purchases: Purchases[];  

}


