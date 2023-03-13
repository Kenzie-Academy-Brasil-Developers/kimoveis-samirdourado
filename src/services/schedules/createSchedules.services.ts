import { verify } from "jsonwebtoken";
import { FindOneOptions, Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { RealEstate, Schedule, User } from "../../entities";
import { AppError } from "../../errors";
import { ISchedule } from "../../interfaces/schedules.interfaces";

const createScheduleService = async (scheduleData: ISchedule, user: number) => {

    let loggedInUserId: number = user
    const realEstateIdData: number = scheduleData.realEstateId

    const userRepository: Repository<User> = AppDataSource.getRepository(User)
    const realStateRepository: Repository<RealEstate> = AppDataSource.getRepository(RealEstate)
    const scheduleRepository: Repository<Schedule> = AppDataSource.getRepository(Schedule)

    const findUserId: User | null = await userRepository.findOneBy({
        id: loggedInUserId!
    })

    const findRealState: RealEstate | null = await realStateRepository.findOneBy({
        id: realEstateIdData
    })

    if (!findRealState) {
        throw new AppError("RealEstate not found", 404)
    }
    
    const hourBody = scheduleData.hour.toString();
    const dateBody = scheduleData.date.toString();

    const finSchedule = await scheduleRepository
        .createQueryBuilder("schedules_users_properties")
        .where("schedules_users_properties.date = :date", {
            date: scheduleData.date
        })
        .andWhere("schedules_users_properties.hour = :hour", {
            hour: hourBody
        })
        .andWhere("schedules_users_properties.realEstate = :id", {
            id: scheduleData.realEstateId
        })
        .getOne()

        if (finSchedule) {
            throw new AppError("Schedule to this real estate at this date and time already exists", 409)
        }        
        
        const schedule = scheduleRepository.create({
            date: dateBody,
            hour: hourBody,
            user: findUserId!,
            realEstate: findRealState!
        })   

        await scheduleRepository.save(schedule)

        return { message: "Schedule created"}
}

export default createScheduleService