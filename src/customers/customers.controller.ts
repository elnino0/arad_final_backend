import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { CustomerService } from './customers.service';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/guards/decorators/roles.decorator';
import { Role } from 'src/emun/role.enum';

@UseGuards(RolesGuard)
@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Roles(Role.Admin)
  @Post()
  createCustomer(@Body() {name, join}: { name: string, join:string}) {
    return this.customerService.createCustomer(name,join);
  }

  @Get()
  getAllCustomer() {
    return this.customerService.getAllCustomers();
  }
}
