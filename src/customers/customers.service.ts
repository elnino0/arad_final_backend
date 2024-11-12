import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customers } from './customers.entity';
import { PurchasesService } from 'src/purchases/purchases.service';
import { Purchases } from 'src/purchases/purchases.entity';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customers)
    private readonly customerRepository: Repository<Customers>,
    private purchasesService:PurchasesService,
  ) {}

  async createCustomer(name: string,email:string,join:string): Promise<Customers> {
    const Customers = this.customerRepository.create({name,email,join});
    Customers.ishideorders = false
    return this.customerRepository.save(Customers);
  }

  async getAllCustomers(): Promise<Customers[]> {
    return this.customerRepository.find();
  }

  async findCustomerByMail(email:string): Promise<Customers>{
    return this.customerRepository.findOne({
      where: {
        email,
    },
    relations: {
      purchases: true,
    }
    })
  }

  async getCustomersWithPurches(): Promise<Customers[]> {
    const customers = await this.customerRepository.find({relations: {
      purchases: true,
    }});
    return customers
  }

  updateCustomers(customers: Customers ): Promise<Customers> {
    return this.customerRepository.save(customers);
  }

  removeCustomers(id: number): Promise<{ affected?: number }> {
    return this.customerRepository.delete(id);
  }

  saveOrders(customer:Customers, order:Purchases[]): Promise<Purchases[]> {
    return this.purchasesService.createPurchaseMulti(customer, order)
  }

  async hideOrders(email: string, ishide:boolean): Promise<Purchases[]> {
    const customer = await this.findCustomerByMail(email)
    customer.ishideorders = ishide
    await this.customerRepository.save(customer)
    return this.purchasesService.hideOrder(customer.purchases, ishide)
  }

  async getcustomerOrders(email): Promise<Purchases[]> {
    const customer = await this.findCustomerByMail(email)

    if(!customer){
      return []
    }

    return customer.purchases
  }
  
  async getselfConsumer(request) {
    const email = request.user.username
    let customer = await this.findCustomerByMail(email);
    if(!customer){
      let new_Date: Date = new Date();
      customer = await this.createCustomer(request.user.sub, email,new_Date.toLocaleDateString() );
    }

    return customer
  }


}
