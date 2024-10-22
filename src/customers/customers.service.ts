import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customers } from './customers.entity';
import { PurchasesService } from 'src/purchases/purchases.service';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customers)
    private readonly customerRepository: Repository<Customers>,
    private purchasesService:PurchasesService 
  ) {}

  async createCustomer(name: string,join:string): Promise<Customers> {
    const Customers = this.customerRepository.create({ name, join});
    return this.customerRepository.save(Customers);
  }

  async getAllCustomers(): Promise<Customers[]> {
    return this.customerRepository.find();
  }

  async getCustomersWithPurches(): Promise<Customers[]> {
    const customers = await this.customerRepository.find();
    for(let c of customers){
      const purchases = await this.purchasesService.getPurchasesByCustomerid(c.id)
      c.purchases = purchases
    }
    return customers
  }

  updateCustomers(customers: Customers ): Promise<Customers> {
    return this.customerRepository.save(customers);
  }

  removeCustomers(id: number): Promise<{ affected?: number }> {
    return this.customerRepository.delete(id);
  }

}
