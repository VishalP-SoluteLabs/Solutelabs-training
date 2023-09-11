import {
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  Column,
  AfterInsert,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Outlet } from './outlet.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ nullable: true })
  userRole: string;

  @OneToOne(() => Outlet, (outlet) => outlet.manager)    //type => User (this function is used to resolve the circular dependency)
  outlet: Outlet;                          // circular dependency means user depends on outlet and outlet depends on user 


  @AfterInsert()
   logInsert(){          //Hooks
    console.log('Inserted user with id: ', this.id);
   }

}
