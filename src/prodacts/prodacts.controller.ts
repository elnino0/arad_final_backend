import { Controller, Get, Post, Body, UseGuards, Patch } from '@nestjs/common';
import { ProdactsService } from './prodacts.service';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/guards/decorators/roles.decorator';
import { Role } from 'src/emun/role.enum';
import { Prodacts } from './prodacts.entity';

@UseGuards(RolesGuard)
@Controller('prodacts')
export class ProdactsController {
  constructor(private readonly prodactService: ProdactsService) {}

  @Roles(Role.Admin)
  @Post()
  createProdact(@Body() {name, cat, price, link, des }: {name: string, cat: string, price:string, link:string, des:string }) {
    return this.prodactService.createProdact(name, cat, price, link, des);
  }

  @Roles(Role.Admin)
  @Get()
  getAllProdact() {
    return this.prodactService.getAllProdact();
  }

  @Roles(Role.Admin)
  @Patch()
  update(@Body() prodacts: Prodacts) {
    return this.prodactService.updateProdacts(prodacts);
  }

  @Roles(Role.Admin,Role.User)
  @Get("/user")
  userProdacts() {
    return this.prodactService.getProdactsForUsers();
  }
}
