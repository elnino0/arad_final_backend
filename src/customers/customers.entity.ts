

import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Unique } from 'typeorm';
import { Purchases } from 'src/purchases/purchases.entity';


@Unique(["email"]) 
@Entity()
export class Customers {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email:string

  @Column()
  join: string;

  @Column()
  ishideorders:boolean;


  @OneToMany(type => Purchases, project => project.customer) purchases: Purchases[];  

  update(customer:Customers){
    this.name = customer.name ? customer.name : this.name 
    this.email = customer.email ? customer.email : this.email 
    this.join = customer.join ? customer.join : this.join 
    this.ishideorders = customer.ishideorders ? customer.ishideorders : this.ishideorders 
  }

}


