import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { ProdactsService } from './prodacts/prodacts.service';
import { ProdactsController } from './prodacts/prodacts.controller';
import { Prodacts } from './prodacts/prodacts.entity';
import { Categoires } from './categoires/categoires.entity';
import { CategoiresController } from './categoires/categoires.controller';
import { CategoiresService } from './categoires/categoires.service';
import { Customers } from './customers/customers.entity';
import { CustomerController } from './customers/customers.controller';
import { CustomerService } from './customers/customers.service';
import { PurchasesController } from './purchases/purchases.controller';
import { PurchasesService } from './purchases/purchases.service';
import { Purchases } from './purchases/purchases.entity';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      password: 'admin',
      username: 'eliran',
      entities: [User,Prodacts,Categoires,Customers,Purchases],
      database: 'aradng',
      synchronize: true,
      logging: true,
    }),
    TypeOrmModule.forFeature([User,Prodacts,Categoires,Customers,Purchases]),
    UserModule,AuthModule
  ],
  controllers: [AppController,ProdactsController,CategoiresController,CustomerController,PurchasesController,AuthController],
  providers: [AppService,ProdactsService,CategoiresService,CustomerService,PurchasesService,AuthService],
})
export class AppModule {}