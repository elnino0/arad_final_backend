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
    private dataSource: DataSource
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

  async getPurchasesByCustomerid(customerId:number): Promise<Purchases[]> {
    return this.dataSource.createQueryBuilder().select("quntety,name,date").from(Purchases, "purchases")
    .where("purchases.customerId = :id", { id: customerId }).getMany()
  }

  updateProdacts(purchases: Purchases ): Promise<Purchases> {
    return this.purchaseRepository.save(purchases);
  }

}
