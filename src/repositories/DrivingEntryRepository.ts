import {Service} from "typedi";
import {Repository} from "typeorm/repository/Repository";
import {DrivingEntry} from "../model/DrivingEntry";
import {Between, Connection, DeleteResult, LessThanOrEqual, MoreThanOrEqual, UpdateResult} from "typeorm";
import {Car} from "../model/Car";
import {User} from "../model/User";

@Service()
export class DrivingEntryRepository {
    private readonly drivingEntryRepository: Repository<DrivingEntry>
    constructor(connection: Connection) {
        this.drivingEntryRepository = connection.getRepository(DrivingEntry)
    }

    public save(drivingEntry: DrivingEntry): Promise<DrivingEntry>{
        return this.drivingEntryRepository.save(drivingEntry);
    }

    public update(id: number, newUser: User): Promise<UpdateResult>{
        return this.drivingEntryRepository.update({id: id}, {user: newUser});
    }

    public findById(id: number): Promise<DrivingEntry>{
        return this.drivingEntryRepository.findOne({where: {id: id}});
    }

    public findAll(): Promise<DrivingEntry[]>{
        return this.drivingEntryRepository.find()
    }

    public findByCar(car: Car): Promise<DrivingEntry[]>{
        return this.drivingEntryRepository.find({where: {car: car}});
    }

    public findByUser(user: User): Promise<DrivingEntry[]>{
        return this.drivingEntryRepository.find({where: {user: user}});
    }

    public findByUserAndCar(user: User, car: Car): Promise<DrivingEntry[]>{
        let where = {
            car: car,
            user: user,
        };
        // @ts-ignore
        where.date = {}
        return this.drivingEntryRepository.find(
        {
            where: where
        })
    }

    public findAllAfter(since: Date, user: User, car: Car): Promise<DrivingEntry[]>{
        return this.drivingEntryRepository.find({where: {date: MoreThanOrEqual(since), car: car, user: user}})
    }

    public findAllBefore(until: Date, user: User, car: Car): Promise<DrivingEntry[]>{
        return this.drivingEntryRepository.find({where: {date: LessThanOrEqual(until), car: car, user: user}})
    }

    public findAllBetween(since: Date, until: Date, user: User = null, car: Car = null): Promise<DrivingEntry[]>{
        if(user == null && car == null)
            return this.drivingEntryRepository.find({where: {date: Between(since, until), car: car, user: user}})
        if(user == null) // car != null
            return this.drivingEntryRepository.find({where: {date: Between(since, until), car: car}})
        if(car == null) // user != null
            return this.drivingEntryRepository.find({where: {date: Between(since, until), user: user}})
        return this.drivingEntryRepository.find({where: {date: Between(since, until)}})
    }

    public delete(id: number): Promise<DeleteResult>{
        return this.drivingEntryRepository.delete({id: id});
    }
}