

import { Categoires } from 'src/categoires/categoires.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Prodacts {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  cat: string;

  @Column()
  price: string;

  @Column()
  link: string;

  @Column()
  des: string;

  @ManyToOne(type => Categoires, categoires => categoires.prodacts,  {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    nullable: false,
    // triggers the delete when the entity was removed from the order.details.
    orphanedRowAction: "delete",
  }) categoiry: Categoires; 

}



