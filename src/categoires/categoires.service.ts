import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categoires } from './categoires.entity';

@Injectable()
export class CategoiresService {
  constructor(
    @InjectRepository(Categoires)
    private readonly CustomerRepository: Repository<Categoires>,

  ) {}

  async createCategoires(name:string): Promise<Categoires> {
    const category = this.CustomerRepository.create({name});
    return this.CustomerRepository.save(category);
  }

  async getAllCategoires(): Promise<Categoires[]> {
    return this.CustomerRepository.find();
  }
}
