import {Column, Entity, PrimaryGeneratedColumn, Timestamp} from "typeorm";


@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({nullable: false})
    name: string;
    @Column({nullable: false})
    date: Date = new Date();

    constructor(name: string, date: Date) {
        this.name = name;
        this.date = date;
    }
}