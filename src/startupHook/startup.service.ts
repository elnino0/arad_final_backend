
import { Injectable, OnModuleInit } from '@nestjs/common';
import AppConfig from 'src/config';
import { UserService } from 'src/user/user.service';

@Injectable()
export class StartupHook implements OnModuleInit {

    constructor(private usersService: UserService) {
    }


  async onModuleInit() {
    const admin =  await this.usersService.addAdmin(AppConfig.ADMIN_NAME,AppConfig.ADMIN_EMAIL,AppConfig.ADMIN_PASSWORD)
    console.log("admin detial", admin)
  }
}