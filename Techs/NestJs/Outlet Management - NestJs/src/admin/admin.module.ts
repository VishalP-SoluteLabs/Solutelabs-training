import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/entity/product.entity';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { User } from 'src/entity/user.entity';
import { Outlet } from 'src/entity/outlet.entity';
import { OutletManagerModule } from 'src/outlet-manager/outlet-manager.module';
import { ProductModule } from 'src/product/product.module';

@Module({
  imports: [TypeOrmModule.forFeature([Product, User, Outlet]), ProductModule, OutletManagerModule],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [],
})
export class AdminModule {}
