import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
}
