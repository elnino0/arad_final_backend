import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { CategoiresService } from './categoires.service';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/guards/decorators/roles.decorator';
import { Role } from 'src/emun/role.enum';

@UseGuards(RolesGuard)
@Controller('categoires')
export class CategoiresController {
  constructor(private readonly categoiresService: CategoiresService) {}

  @Roles(Role.Admin)
  @Post()
  createCustomer(@Body() {name}: { name: string}) {
    return this.categoiresService.createCategoires(name);
  }

  @Roles(Role.Admin)
  @Get()
  getAllCustomer() {
    return this.categoiresService.getAllCategoires();
  }
}
