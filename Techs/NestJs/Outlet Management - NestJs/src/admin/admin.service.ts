  import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AdminOutletFilterDto } from "src/dto/admin-outlet-filter.dto";
import { OutletStatusDto } from "src/dto/outlet-status.dto";
import { OutletDto } from "src/dto/outlet.dto";
import { ProductDto } from "src/dto/product.dto";
import { Outlet } from "src/entity/outlet.entity";
import { Product } from "src/entity/product.entity";
import { OutletService } from "src/outlet-manager/outlet-manager.service";
import { ProductService } from "src/product/product.service";
import { Repository } from "typeorm";

@Injectable()
export class AdminService{
    constructor(@InjectRepository(Product) private productRepo: Repository<Product>,
                @InjectRepository(Outlet) private outletRepo: Repository<Outlet>,
                private readonly productService: ProductService,
                private readonly outletService: OutletService){}

    async addProduct(productDto: ProductDto): Promise<ProductDto>{
       
      return this.productService.addProduct(productDto)
    }


    async changeOutletStatus(id: number, status: OutletStatusDto): Promise<OutletDto>{
        
         const outlet = await this.outletService.findById(id)
         outlet.status = status.status

         return this.outletService.saveOutletStatus(outlet)        
    }

    async getSingleOutlet(id: number): Promise<Outlet>{
      
        const outlet = await this.outletService.findById(id);
        return outlet;
    }


    async getOutletsFilter({ city, name, state, status, opens, closes }: AdminOutletFilterDto): Promise<Outlet[]>{
          const query = this.outletRepo.createQueryBuilder('outlet')
                 
          if(city){
            query.where('city = :city', { city })
          }

          if(name){
            query.andWhere('name = :name', { name })
          }

          if(state){
            query .andWhere('state = :state', { state })
          }

          if(status){
            query .andWhere('status = :status', { status })
          }

          if(opens){
            query .andWhere('opens >= :opens', { opens })
          }

          if(closes){
            query .andWhere('closes <= :closes', { closes })
          }
                             
          return query.getMany()
    }


    async getCityProduct({ city }: AdminOutletFilterDto): Promise<Object[]>{
      const outletQueryBuilder = this.outletRepo
                                .createQueryBuilder('outlet')
                                .select('outlet.id', 'outletId')
                                .where('outlet.city = :city', { city })

      const result = await outletQueryBuilder.getRawMany();
      if(result.length === 0){
        throw new NotFoundException('No Outlet Found!')
      }
      const outletIds = result.map((row) => row.outletId);

      const queryBuilder = await this.outletService.getAggregateStatus(outletIds) 

      return queryBuilder;
    }

    async getStateProduct({ state }: AdminOutletFilterDto): Promise<Object[]>{
      const outletQueryBuilder = this.outletRepo
                                .createQueryBuilder('outlet')
                                .select('outlet.id', 'outletId')
                                .where('outlet.state = :state', { state })

      const result = await outletQueryBuilder.getRawMany();
      if(result.length === 0){
        throw new NotFoundException('No Outlet Found!')
      }
      const outletIds = result.map((row) => row.outletId);

      return this.outletService.getAggregateStatus(outletIds)     
    }

    async getCityStateProduct({ city, state}: AdminOutletFilterDto): Promise<Object[]>{
      const outletQueryBuilder = this.outletRepo
                                      .createQueryBuilder('outlet')
                                      .select('outlet.id', 'outletId')
                                      .where('outlet.state = :state', { state })
                                      .andWhere('outlet.city = :city', { city })

      const result = await outletQueryBuilder.getRawMany();
      if(result.length === 0){
        throw new NotFoundException('No Outlet Found!')
      }
      const outletIds = result.map((row) => row.outletId);
      console.log('result: ', result, 'OutletIds: ', outletIds)

      return this.outletService.getAggregateStatus(outletIds)     
    }

    async getSingleOutletProductStaus({ id }: AdminOutletFilterDto): Promise<Object[]>{

      return this.outletService.getAggregateStatus( [ id ] ); 
    }

    async getAllOutetProductStatus(): Promise<Object[]>{
    return await this.outletService.getAllOutetProductStatus()
   } 

}