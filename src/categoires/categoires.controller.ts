import { Controller, Get, Post, Body, UseGuards, Patch, Param, Delete } from '@nestjs/common';
import { CategoiresService } from './categoires.service';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/guards/decorators/roles.decorator';
import { Role } from 'src/emun/role.enum';
import { Categoires } from './categoires.entity';

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

  @Roles(Role.Admin)
  @Patch()
  update(@Body() categoires: Categoires) {
    return this.categoiresService.updateCategoiry(categoires);
  }

  @Roles(Role.Admin)
  @Delete(":id")
  remove(@Param("id") id:number) {
    console.log("remove id ",id)
    return this.categoiresService.removeCategoiry(id);
  }

}
