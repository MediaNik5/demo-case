import {Connection, Entity, UpdateResult} from "typeorm";
import {Service} from "typedi";
import {Repository} from "typeorm/repository/Repository";
import {Car} from "../model/Car";
import {User} from "../model/User";
import {JsonController} from "routing-controllers";


@Service()
@JsonController()
export class CarRepository{
    private readonly carRepository: Repository<Car>;

    constructor(connection: Connection) {
        this.carRepository = connection.getRepository(Car);
    }

    public save(car: Car): Promise<Car> {
        return this.carRepository.save(car);
    }

    public update(id: number, newOwner: User): Promise<UpdateResult>{
        return this.carRepository.update({id: id}, {owner: newOwner})
    }

    public findAll(): Promise<Car[]>{
        return this.carRepository.find()
    }

    public findById(id: number): Promise<Car>{
        return this.carRepository.findOne({where: {id: id}});
    }

    public findAllByBrand(brand: string): Promise<Car[]>{
        return this.carRepository.find({where: {brand: brand}});
    }

    public findByOwner(owner: User): Promise<Car>{
        return this.carRepository.findOne({where: {owner: owner}});
    }
}