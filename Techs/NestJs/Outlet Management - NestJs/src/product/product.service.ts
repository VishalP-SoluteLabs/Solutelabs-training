import { InjectRepository } from "@nestjs/typeorm";
import { ProductDto } from "src/dto/product.dto";
import { Product } from "src/entity/product.entity";
import { In, Repository } from "typeorm";


export class ProductService{
    constructor(@InjectRepository(Product) private productRepo: Repository<Product>){}

    findById(id: number): Promise<ProductDto>{

        return this.productRepo.findOne({ where: { id }})
    }

    findByName(name: string): Promise<Product>{

        return this.productRepo.findOne({ where: { name: name}})
    }

    async addProduct(productDto: ProductDto): Promise<ProductDto>{
        const product = this.productRepo.create(productDto);
        return await this.productRepo.save(product)
    }


    findByIdArray(productIds: number[]){
        return this.productRepo.find({ where: {
            id: In(productIds),
          },
        });
    }
}