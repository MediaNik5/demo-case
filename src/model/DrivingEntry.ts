import {Column, Entity, ManyToOne, PrimaryGeneratedColumn, Timestamp} from "typeorm";
import {Car} from "./Car";
import {User} from "./User";

@Entity()
export class DrivingEntry{
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Car, {nullable: false})
    car: Car;

    @ManyToOne(() => User, {nullable: true})
    user: User;

    @Column({nullable: false})
    date: Date;


    constructor(car: Car, user: User, date: Date) {
        this.car = car;
        this.user = user;
        this.date = date;
    }
}