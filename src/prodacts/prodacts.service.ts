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

  async createProdact(name: string, cat: string, price:string, link:string, des:string): Promise<Prodacts> {

    let categoiry = await this.categoiresRepository.findOne(      {
      where: {
          name:cat,
      },
  })
  
  console.log("createProdact categoiry", categoiry)
  const prodact = this.prodactsRepository.create({ name, cat, price, link, des });

    if(!categoiry){
      const entity = new Categoires()
      entity.name = cat
      categoiry = await this.categoiresRepository.save(entity)
    }
    prodact.categoiry = categoiry
    console.log("createProdact",prodact)
    return this.prodactsRepository.save(prodact);
  }

  async getAllProdact(): Promise<Prodacts[]> {
    return this.prodactsRepository.find();
  }

  updateProdacts(prodact: Prodacts ): Promise<Prodacts> {
    return this.prodactsRepository.save(prodact);
  }

}
