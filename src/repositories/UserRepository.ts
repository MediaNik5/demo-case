import {Service} from "typedi";
import {Repository} from "typeorm/repository/Repository";
import {User} from "../model/User";
import {Between, Connection, DeleteResult, ILike, LessThanOrEqual, MoreThanOrEqual} from "typeorm";

@Service()
export class UserRepository{
    private readonly userRepository: Repository<User>;
    constructor(connection: Connection) {
        this.userRepository = connection.getRepository(User);
    }

    public save(user: User): Promise<User>{
        return this.userRepository.save(user);
    }

    public findById(id: number): Promise<User>{
        return this.userRepository.findOne({where: {id: id}})
    }

    public findAll(): Promise<User[]>{
        return this.userRepository.find();
    }

    public findAllByName(name: string): Promise<User[]>{
        return this.userRepository.find({ name: ILike("%" + name + "%") })
    }

    public findAllRegisteredAfter(date: Date): Promise<User[]>{
        return this.userRepository.find({where: {date: MoreThanOrEqual(date)}})
    }

    public findAllRegisteredBefore(date: Date): Promise<User[]>{
        return this.userRepository.find({where: {date: LessThanOrEqual(date)}})
    }

    public findAllRegisteredBetween(since: Date, until: Date): Promise<User[]>{
        return this.userRepository.find({where: {date: Between(since, until)}})
    }

    public delete(id: number): Promise<DeleteResult>{
        return this.userRepository.delete({id: id})
    }
}