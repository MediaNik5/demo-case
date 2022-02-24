import {Service} from "typedi";
import {Body, Delete, Get, JsonController, Param, Post, QueryParam} from "routing-controllers";
import {User} from "../model/User";
import {UserRepository} from "../repositories/UserRepository";
import {DeleteResult} from "typeorm";

@Service()
@JsonController("/user")
export class UserController {
    constructor(private readonly userRepository: UserRepository) {}

    @Post("/new")
    public newUser(@Body() user: User): Promise<User>{
        return this.userRepository.save(user);
    }

    @Get("/get_all")
    public getAll(@QueryParam("name", {required: false}) name: string): Promise<User[]>{
        if(name != null)
            return this.userRepository.findAllByName(name);
        return this.userRepository.findAll();
    }

    @Get("/get_one")
    public getOne(@QueryParam("id") id: number): Promise<User>{
        return this.userRepository.findById(id);
    }

    @Get("/get_all_between")
    public between(
        @QueryParam("since", {required: false}) since: Date,
        @QueryParam("until", {required: false}) until: Date
    ){
        console.log(since)
        if(since == null && until == null){
            return this.getAll(null)
        }else if(since == null){ // until != null
            return this.userRepository.findAllRegisteredBefore(until);
        }else if(until == null){ // since != null
            return this.userRepository.findAllRegisteredAfter(since);
        }else{
            return this.userRepository.findAllRegisteredBetween(since, until);
        }
    }

    @Delete("/delete")
    public deleteUser(@Body() id: number): Promise<DeleteResult>{
        return this.userRepository.delete(id);
    }
}