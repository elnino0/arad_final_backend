import { Controller, Get, Post, Body, UseGuards, Patch, Delete, Param, Request } from '@nestjs/common';
import { CustomerService } from './customers.service';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/guards/decorators/roles.decorator';
import { Role } from 'src/emun/role.enum';
import { Customers } from './customers.entity';
import { Purchases } from 'src/purchases/purchases.entity';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(RolesGuard)
@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Roles(Role.Admin)
  @Post()
  createCustomer(@Body() {name, email, join}: { name: string, email:string, join:string}) {
    return this.customerService.createCustomer(name, email, join);
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

  @Roles(Role.Admin,Role.User)
  @Delete('')
  remove(@Param('id') id: number) {
    return this.customerService.removeCustomers(id);
  }

  @Roles(Role.Admin,Role.User)
  @Post('orders')
  async saveOrders(@Request() request, @Body() orders: Purchases[] ) {
    console.log("orders",orders)
    const customer = await this.customerService.getselfConsumer(request)
    return this.customerService.saveOrders(customer, orders);
  }

  @Roles(Role.Admin,Role.User)
  @Patch('hideOrders')
  async hideOrders(@Request() request,@Body() {ishide}) {
    const customer = await this.customerService.getselfConsumer(request)
    return this.customerService.hideOrders(customer.email,ishide);
  }

 @Roles(Role.Admin,Role.User)
  @Get('self')
  async getselfConsumer(@Request() request) {
    const email = request.user.username
    let customer = await this.customerService.findCustomerByMail(email);
    if(!customer){
      let new_Date: Date = new Date();
      customer = await this.customerService.createCustomer(request.user.sub, email,new_Date.toLocaleDateString() );
    }

    return customer
  }

  @Roles(Role.Admin,Role.User)
  @Get('orders')
  getOrders(@Request() request) {
    const email = request.user.username
    return this.customerService.getcustomerOrders(email);
  }

}
