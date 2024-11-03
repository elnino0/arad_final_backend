import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Purchases } from './purchases.entity';
import { Customers } from 'src/customers/customers.entity';

@Injectable()
export class PurchasesService {
  constructor(
    @InjectRepository(Purchases)
    private readonly purchaseRepository: Repository<Purchases>,
    @InjectRepository(Customers)
    private readonly customerRepository: Repository<Customers>,
  ) {}

  async createPurchase( customersid:number, quntety:Number, name:string ,prodactId:Number , date:string): Promise<Purchases> {

    const customer =  await this.customerRepository.findOne(
      {
        where: {
            id: customersid,
        },
    })
    const purchase = this.purchaseRepository.create({quntety, name,  prodactId, date});
    purchase.customer =  customer
    return this.purchaseRepository.save(purchase);
  }

  async getAllPurchases(): Promise<Purchases[]> {
    return this.purchaseRepository.find();
  }

  updateProdacts(purchases: Purchases ): Promise<Purchases> {
    return this.purchaseRepository.save(purchases);
  }

  
  async createPurchaseMulti( customer:Customers, orders:Purchases[]): Promise<Purchases[]> {

    const ordersSaved = this.purchaseRepository.create(orders);

    for(let order of ordersSaved){
      order.ishide = false
      order.customer = customer
      await this.purchaseRepository.save(order);
    }
    return ordersSaved;
  }

  async hideOrder(orders:Purchases[],ishide:boolean = true){

    for(let order of orders){
        order.ishide = ishide
       await this.purchaseRepository.save(order);
    }

    return orders
  }

}
