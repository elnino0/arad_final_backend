

import { Prodacts } from 'src/prodacts/prodacts.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Unique } from 'typeorm';

@Unique(["name"]) 
@Entity()
export class Categoires {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(type => Prodacts, project => project.cat) prodacts: Prodacts[];  

}