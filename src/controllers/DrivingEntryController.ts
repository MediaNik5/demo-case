import {Service} from "typedi";
import {Body, Get, JsonController, Post, QueryParam} from "routing-controllers";
import {DrivingEntryRepository} from "../repositories/DrivingEntryRepository";
import {Connection} from "typeorm";
import {DrivingEntry} from "../model/DrivingEntry";
import {Car} from "../model/Car";
import {User} from "../model/User";


@Service()
@JsonController("/driving_entry")
export class DrivingEntryController {
    constructor(private readonly drivingEntryRepository: DrivingEntryRepository) {
    }

    @Post("/new")
    public newDrivingEntry(@Body() drivingEntry: DrivingEntry): Promise<DrivingEntry> {
        drivingEntry.date = new Date();
        return this.drivingEntryRepository.save(drivingEntry);
    }

    @Get("/get_all")
    public getAll(
        @QueryParam("car", {required: false}) car: Car,
        @QueryParam("user", {required: false}) user: User,
        @QueryParam("until") until: Date,
        @QueryParam("since") since: Date,
    ) {
        if (car != null && user != null) {
            return this.drivingEntryRepository.findAllBetween(since, until, user, car);
        } else if (car != null) { // user == null
            return this.drivingEntryRepository.findAllBetween(since, until, null, car);
        } else if (user != null) { // car == null
            return this.drivingEntryRepository.findAllBetween(since, until, user);
        } else {
            throw Promise.reject("{status: 400, error: \"You must specify either car or user\"}")
        }
    }

    @Get("/get_one")
    public getOne(@QueryParam("id") id: number) {
        return this.drivingEntryRepository.findById(id);
    }
}