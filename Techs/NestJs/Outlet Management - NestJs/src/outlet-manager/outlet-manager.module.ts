import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Outlet } from 'src/entity/outlet.entity';
import { OutletService } from './outlet-manager.service';
import { OutletManagerController } from './outlet-manager.controller';
import { ProductModule } from 'src/product/product.module';
import { OutletProducts } from 'src/entity/outlet-products.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Outlet, OutletProducts]), ProductModule],
  controllers: [OutletManagerController],
  providers: [OutletService],
  exports: [OutletService],
})
export class OutletManagerModule {}