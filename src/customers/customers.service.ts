import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customers } from './customers.entity';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customers)
    private readonly CustomerRepository: Repository<Customers>,
  ) {}

  async createCustomer(name: string,join:string): Promise<Customers> {
    const Customers = this.CustomerRepository.create({ name, join});
    return this.CustomerRepository.save(Customers);
  }

  async getAllCustomers(): Promise<Customers[]> {
    return this.CustomerRepository.find();
  }
}
