import {Column, Entity, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./User";

@Entity()
export class Car{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false})
    brand: string;

    @OneToOne(() => User, {nullable: false})
    owner: User;

    constructor(brand: string, owner: User) {
        this.brand = brand;
        this.owner = owner;
    }
}