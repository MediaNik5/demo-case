import {Service} from "typedi";
import {Body, Get, JsonController, Post, QueryParam} from "routing-controllers";
import {UserRepository} from "../repositories/UserRepository";
import {CarRepository} from "../repositories/CarRepository";
import {Car} from "../model/Car";
import {User} from "../model/User";


@Service()
@JsonController("/car")
export class CarController{
    constructor(private readonly carRepository: CarRepository) {}

    @Post("/new")
    public newCar(@Body() car: Car){
        return this.carRepository.save(car);
    }

    @Get("/get_one")
    public one(
        @QueryParam("id", {required: false}) id: number,
        @QueryParam("owner", {required: false}) owner: User
    ): Promise<Car>{
        if(id == null){
            if(owner == null){
                return Promise.reject("{status: 400, error: \"You have to specify either id or owner\"}")
            }
            return this.carRepository.findByOwner(owner);
        }else{
            return this.carRepository.findById(id);
        }
    }

    @Get("/get_all")
    public all(@QueryParam("brand", {required: false}) brand: string): Promise<Car[]>{
        if(brand == null) {
            return this.carRepository.findAll();
        }else {
            return this.carRepository.findAllByBrand(brand);
        }
    }
}