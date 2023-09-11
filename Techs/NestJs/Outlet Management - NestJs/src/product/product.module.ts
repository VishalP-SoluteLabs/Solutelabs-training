import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/entity/product.entity';
import { ProductService } from './product.service';


@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}