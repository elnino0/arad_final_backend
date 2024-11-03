import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Prodacts } from './prodacts.entity';
import { Categoires } from 'src/categoires/categoires.entity';
import { PurchasesService } from 'src/purchases/purchases.service';
import { UserProdact } from './UserProdacts';

function update(arr, id, updatedData) {
  return arr.map((item) => (item.id === id ? { ...item, ...updatedData } : item))
}



@Injectable()
export class ProdactsService {
  constructor(
    @InjectRepository(Prodacts)
    private readonly prodactsRepository: Repository<Prodacts>,
    @InjectRepository(Categoires)
    private readonly categoiresRepository: Repository<Categoires>,
    private purchasesService:PurchasesService
  ) {}

  async createProdact(name: string, cat: string, price:string, link:string, des:string): Promise<Prodacts> {

    let categoiry = await this.categoiresRepository.findOne(      {
      where: {
          name:cat,
      },
  })
  
  const prodact = this.prodactsRepository.create({ name, cat, price, link, des });

    if(!categoiry){
      const entity = new Categoires()
      entity.name = cat
      categoiry = await this.categoiresRepository.save(entity)
    }
    prodact.categoiry = categoiry
    return this.prodactsRepository.save(prodact);
  }

  async getAllProdact(): Promise<Prodacts[]> {
    return this.prodactsRepository.find();
  }

  updateProdacts(prodact: Prodacts ): Promise<Prodacts> {
    return this.prodactsRepository.save(prodact);
  }

  async getProdactsForUsers(): Promise<UserProdact[]> {

    const orders = await this.purchasesService.getAllPurchases()
    const prodacts = await this.getAllProdact()
    let userProdacts = []

    for(let prod of prodacts){
        const up = new UserProdact()
        up.cat=prod.cat
        up.des=prod.des
        up.id=prod.id
        up.link=prod.link
        up.name=prod.name
        up.price=prod.price
        up.bought=0
        userProdacts.push(up)
    }

    for(let order of orders){
      userProdacts = userProdacts.map((item) => {
        if(item.name === order.name && !order.ishide){
           item.bought += order.quntety
        }
        return item
      })
    }

    return userProdacts;
  }

}
