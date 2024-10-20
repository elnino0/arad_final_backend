import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { PurchasesService } from './purchases.service';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/guards/decorators/roles.decorator';
import { Role } from 'src/emun/role.enum';

@UseGuards(RolesGuard)
@Controller('purchases')
export class PurchasesController {
  constructor(private readonly purchasesService: PurchasesService) {}


  @Roles(Role.Admin)
  @Post()
  createPoll(@Body() { customersid, quntety, name,  prodactId, date}: {customersid:number, quntety:Number , name:string ,prodactId:Number , date:string }) {
    return this.purchasesService.createPurchase(customersid, quntety, name,  prodactId, date);
  }

  @Roles(Role.Admin)
  @Get()
  getAllPolls() {
    return this.purchasesService.getAllPurchases();
  }
}
