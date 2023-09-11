import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { User } from "./user.entity";
import { Exclude, Transform } from "class-transformer";
import { Product } from "./product.entity";
import { OutletProducts } from "./outlet-products.entity";


@Entity()
export class Outlet{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
    
    @Column()
    city: string; 
    
    @Column()
    state: string;
     
    @Column()
    area: string; 
    
    @Column({ default: 'active' })
    status: string;

    @Column()
    opens: number

    @Column()
    closes: number  

    // @Column('simple-array',{default: []})
    // products: string
   // @Exclude()
    @Transform(({obj}) => obj.manager.id)
    @OneToOne(() => User, (manager) => manager.outlet)    //type => User (this function is used to resolve the circular dependency)
    @JoinColumn()
    manager: User;                          // circular dependency means user depends on outlet and outlet depends on user 


    @ManyToMany(() => Product)
    @JoinTable({ name: 'outlet_product2'})
    products: Product[]

    @Transform(({ value }) => value.map(op => ({ productId: op.productId, quantity: op.quantity,status: op.status })))
    @OneToMany(() => OutletProducts, outletProducts => outletProducts.outlet, {
        cascade: true,
        onDelete: 'CASCADE',
      })
    @JoinColumn()
    outletProducts: OutletProducts[]  
    

   
}