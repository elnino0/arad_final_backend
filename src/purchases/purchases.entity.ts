

import { Customers } from 'src/customers/customers.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne} from 'typeorm';

@Entity()
export class Purchases {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quntety:Number
  @Column()
  name:string
  @Column()
  prodactId:Number
  @Column()
  date:string
  @Column()
  price:string
  @Column()
  ishide:boolean

  @ManyToOne(() => Customers, (customer) => customer.purchases,  {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    nullable: false,
  })
  customer: Customers;

}



