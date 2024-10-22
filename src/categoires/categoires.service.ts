import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Categoires } from './categoires.entity';

@Injectable()
export class CategoiresService {
  constructor(
    @InjectRepository(Categoires)
    private readonly categoiresRepository: Repository<Categoires>,

  ) {}

  async createCategoires(name:string): Promise<Categoires> {
    const category = this.categoiresRepository.create({name});
    return this.categoiresRepository.save(category);
  }

  async getAllCategoires(): Promise<Categoires[]> {
    return this.categoiresRepository.find();
  }

  async updateCategoiry(categoires: Categoires ): Promise<Categoires> {
    return this.categoiresRepository.save(categoires);
  }

  async removeCategoiry(id: number ): Promise<DeleteResult> {
    console.log("removeCategoiry id",id)
    return this.categoiresRepository.delete(id);
  }

}
