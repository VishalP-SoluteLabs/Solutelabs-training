import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { productStatus } from "src/util/constant.util";
import { Outlet } from "./outlet.entity";
import { Product } from "./product.entity";


@Entity()
export class OutletProducts{

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    productId: number;

    @Column()
    outletId: number;

    @Column({nullable: true})
    quantity: number;

    @Column({default: productStatus.AVAILABLE})
    status: string;

    @ManyToOne(() => Outlet, outlet => outlet.id)
    outlet: Outlet
} 