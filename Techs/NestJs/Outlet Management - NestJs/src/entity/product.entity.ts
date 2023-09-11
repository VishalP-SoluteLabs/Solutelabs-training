import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Outlet } from "./outlet.entity";
import { OutletProducts } from "./outlet-products.entity";


@Entity()
export class Product{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    imageUrl: string;

    @Column()
    price: number;
    
    @Column()
    category: string;

    @Column()
    description: string;

    @CreateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
      })
      created_at: Date;
    
    @UpdateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
        onUpdate: 'CURRENT_TIMESTAMP(6)',
      })
      updated_at: Date;

    @ManyToMany(() => Outlet, outlets => outlets.products)
    outlets: Outlet  
    
}