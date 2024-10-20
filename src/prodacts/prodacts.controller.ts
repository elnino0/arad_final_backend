import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { ProdactsService } from './prodacts.service';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/guards/decorators/roles.decorator';
import { Role } from 'src/emun/role.enum';

@UseGuards(RolesGuard)
@Controller('prodacts')
export class ProdactsController {
  constructor(private readonly prodactService: ProdactsService) {}

  @Roles(Role.Admin)
  @Post()
  createProdact(@Body() {catid, name, cat, price, link, des }: {catid:number, name: string, cat: string, price:string, link:string, des:string }) {
    return this.prodactService.createProdact(catid, name, cat, price, link, des);
  }

  @Roles(Role.Admin)
  @Get()
  getAllProdact() {
    return this.prodactService.getAllProdact();
  }
}
