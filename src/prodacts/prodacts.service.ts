import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Prodacts } from './prodacts.entity';
import { Categoires } from 'src/categoires/categoires.entity';

@Injectable()
export class ProdactsService {
  constructor(
    @InjectRepository(Prodacts)
    private readonly prodactsRepository: Repository<Prodacts>,
    @InjectRepository(Categoires)
    private readonly categoiresRepository: Repository<Categoires>,
  ) {}

  async createProdact(catid:number, name: string, cat: string, price:string, link:string, des:string): Promise<Prodacts> {

    let categoiry = await this.categoiresRepository.findOne(      {
      where: {
          id: catid,
      },
  })
  
  if(!categoiry){
    categoiry = this.categoiresRepository.create({name})
  }

    const prodact = this.prodactsRepository.create({ name, cat, price, link, des });
    prodact.categoiry = categoiry
    return this.prodactsRepository.save(prodact);
  }

  async getAllProdact(): Promise<Prodacts[]> {
    return this.prodactsRepository.find();
  }
}
