

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

  @ManyToOne(() => Customers, (customer) => customer.purchases)
  customer: Customers;

}



