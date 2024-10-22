import { Controller, Get, Post, Body, UseGuards, Patch, Delete, Param } from '@nestjs/common';
import { CustomerService } from './customers.service';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/guards/decorators/roles.decorator';
import { Role } from 'src/emun/role.enum';
import { Customers } from './customers.entity';

@UseGuards(RolesGuard)
@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Roles(Role.Admin)
  @Post()
  createCustomer(@Body() {name, join}: { name: string, join:string}) {
    return this.customerService.createCustomer(name,join);
  }

  @Roles(Role.Admin)
  @Get()
  getAllCustomer() {
    return this.customerService.getCustomersWithPurches();
  }

  @Roles(Role.Admin)
  @Patch()
  update(@Body() customers: Customers) {
    return this.customerService.updateCustomers(customers);
  }

  @Delete('')
  remove(@Param('id') id: number) {
    return this.customerService.removeCustomers(id);
  }

}
