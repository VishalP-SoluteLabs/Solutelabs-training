import { Injectable, NotAcceptableException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OutletProductFilterDto } from "src/dto/outlet-product-filter.dto";
import { OutletProductsDto } from "src/dto/outlet-products.dto";
import { OutletDto } from "src/dto/outlet.dto";
import { OutletProducts } from "src/entity/outlet-products.entity";
import { Outlet } from "src/entity/outlet.entity";
import { User } from "src/entity/user.entity";
import { Serialize } from "src/interceptor/serealize.interceptor";
import { ProductService } from "src/product/product.service";
import { OutletProductsResponseDto } from "src/responses dto/outlet-product-response.dto";
import {  In, LessThanOrEqual, MoreThan, MoreThanOrEqual, Repository } from "typeorm";
import { productStatus } from "src/util/constant.util";


@Injectable()
export class OutletService{
    constructor(
        @InjectRepository(Outlet) private outletRepo: Repository<Outlet>,
        @InjectRepository(OutletProducts) private outletProductRepo: Repository<OutletProducts>,
        private readonly productService: ProductService,
        ){}


    addOutlet(outletDto: OutletDto, manager: User): Promise<OutletDto>{
        try {
            const outlet = this.outletRepo.create(outletDto);
            outlet.manager = manager
            
            return this.outletRepo.save(outlet)
        } catch (error) {
            console.log(error)
        }
    }


   async buyOutletProducts( productId: number, outlets: Outlet, quantity: number  ): Promise<OutletProductsDto>{
     

            if(!outlets){
                throw new NotFoundException("Outlet not found");
            }
            const product = await this.productService.findById(productId);

            if(!product){
                throw new NotFoundException('No Product with this Id found!')
            }
               
            const outletProducts = new OutletProductsDto();

            const isExistProduct = await this.outletProductRepo.findOne({ where: {productId: productId, outletId: outlets.id}})
        

            if(!isExistProduct){   
               outletProducts.productId = productId;
               outletProducts.outletId = outlets.id;
               outletProducts.quantity = quantity;
               const outletProds = this.outletProductRepo.create(outletProducts)
               return await this.outletProductRepo.save(outletProds)  

            } else{

                isExistProduct.status = productStatus.AVAILABLE    //If product quantity is zero
                isExistProduct.quantity += quantity;
                
                return await this.outletProductRepo.save(isExistProduct)
            }

    }
 

    async sellOutletProducts( productId: number, outlets: Outlet, quantity: number  ): Promise<OutletProductsDto>{
        
             
              const product = await this.productService.findById(productId);

              if(!product){
                  throw new NotFoundException('No Product with this Id found!')
              }
  

            const isExistProduct = await this.outletProductRepo.findOne({ where: {productId: productId, outletId: outlets.id}})
            

            if(!isExistProduct){                
               throw new NotFoundException('Product with this Id not Found!');
               
            } else if(isExistProduct.quantity === 0){
                throw new NotFoundException('Product with this Id is out of stock!');
                
            } else if(isExistProduct.quantity < quantity){

                throw new NotAcceptableException(`Only ${isExistProduct.quantity} piece are available for this product`);

            } else {  
                isExistProduct.quantity -= quantity;
                if(isExistProduct.quantity === 0){
                    isExistProduct.status = productStatus.OUT_OF_STOCK;
                }
                
                return await this.outletProductRepo.save(isExistProduct)
            }


    }


    async findByManagerId(manager: User): Promise<Outlet[]>{
        const outlets = await this.outletRepo
        .createQueryBuilder('outlet')
        .where('outlet.managerId = :managerId', { managerId: manager.id })
        .leftJoinAndSelect('outlet.manager', 'manager')
        .getMany();
    
      return outlets;
    }


    async findById(id: number): Promise<Outlet>{
        const outlet = await this.outletRepo.findOne({ 
            where: { id },
            relations: {
                outletProducts: true,
                manager: true 
            }
        })

        if(!outlet){
            throw new NotFoundException('Outlet Not Found!');
        }

        return outlet;
    }


    saveOutletStatus(outletDto: OutletDto): Promise<OutletDto>{
        return this.outletRepo.save(outletDto)
    }


    async getAggregateStatus(outletIds: number[]): Promise<Object[]>{

        if(outletIds.length == 1){
           const Ids = [+outletIds] 
            outletIds = Ids 
            console.log('dsfsdf: ', outletIds)
        }
       return await this.outletProductRepo
                                  .createQueryBuilder('outlet_products')
                                  .select('outlet_products.status', 'status')
                                  .addSelect('COUNT(outlet_products.outletId)', 'count')
                                  .where('outlet_products.outletId IN (:...outletIds)', { outletIds })
                                  .groupBy('outlet_products.status')
                                  .getRawMany();

                              
    }

    getAllOutetProductStatus(){
        const queryBuilder = this.outletProductRepo
                                  .createQueryBuilder('outlet_products')
                                  .select('outlet_products.status', 'status')
                                  .addSelect('COUNT(outlet_products.id)', 'count')
                                  .groupBy('outlet_products.status')

        return queryBuilder.getRawMany();
    }

    async getOutletProductFilter( { name, minPrice, maxPrice, minQuantity, maxQuantity, managerId} : OutletProductFilterDto): Promise<OutletProductsResponseDto[]>{
       
      const outlet = await this.outletRepo.findOne({ 
        where: { manager: { id: managerId } }, 
        relations: { 
            manager: true,
            outletProducts: true,
         }})

         if(!outlet){
            throw new NotFoundException('Outlet Not Found!')
         } 

         const product1 = await this.productService.findByName(name)
        
         const outletProductIds = outlet.outletProducts.map(val => val.productId);

         const outletProds = await this.productService.findByIdArray(outletProductIds)
        if(name){
           return this.outletProductRepo.find({ where: { productId: product1.id}})
        }

        if(minPrice){
            const prods = outletProds.filter(product => {
                if(product.price >= +minPrice){
                    return product.id
                }
            })
            const prodIds = prods.map(product => product.id); 
            return this.outletProductRepo.find({
                 where: { productId: In(prodIds), outletId: outlet.id},
                
                })
        }

        if(maxPrice){
            const prods = outletProds.filter(product => {
                if(product.price <= +maxPrice){
                    return product.id
                }
            })
            const prodIds = prods.map(product => product.id);
            return this.outletProductRepo.find({
                 where: { productId: In(prodIds), outletId: outlet.id},
                
                })
        }

        if(minQuantity){
            const prods = await this.outletProductRepo.find({ 
                where: { quantity: MoreThanOrEqual(+minQuantity), outletId: outlet.id}
            })

            if(prods.length === 0){
                throw new NotFoundException('No Products Found')
            }

            return prods;
        }

        if(maxQuantity){
            const prods = await this.outletProductRepo.find({ 
                where: { quantity: LessThanOrEqual(+maxQuantity), outletId: outlet.id}
            })

            if(prods.length === 0){
                throw new NotFoundException('No Products Found')
            }

            return prods;
        }
        
    }

}