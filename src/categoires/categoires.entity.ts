

import { Prodacts } from 'src/prodacts/prodacts.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Categoires {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(type => Prodacts, project => project.cat) projects: Prodacts[];  

}