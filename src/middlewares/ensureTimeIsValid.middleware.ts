import { NextFunction, Request, Response } from "express"
import { AppError } from "../errors"
import { Repository } from "typeorm"
import { RealEstate, Schedule } from "../entities"
import { AppDataSource } from "../data-source"

const ensureTimeAvaiable = async (req: Request, res: Response, next: NextFunction) => {  

  const scheduleRepository: Repository<Schedule> = AppDataSource.getRepository(Schedule)
  const realStateRepository: Repository<RealEstate> = AppDataSource.getRepository(RealEstate)
  
  const { date, hour, realEstateId } = req.body

  const userId = Number(req.user.id)  
  
  const dataDay = new Date(date)
  const day = dataDay.getDay()
  const [hours, minutes] = req.body.hour.split(":").map(Number)  

  if (day == 0 || day == 6) {
    throw new AppError("Invalid date, work days are monday to friday", 400)
  }

  if (hours < 8 || hours > 18) {
    throw new AppError("Invalid hour, available times are 8AM to 18PM", 400)
  } 

  const findRealState: RealEstate | null = await realStateRepository.findOneBy({
    id: realEstateId
  })

  if (!findRealState) {
    throw new AppError("RealEstate not found", 404)
}

  const scheduleExists = await scheduleRepository
    .createQueryBuilder("schedule")
    .where("schedule.realEstate.id = :realEstateId", { realEstateId: realEstateId })
    .andWhere("schedule.date = :date", { date: date })
    .andWhere("schedule.hour = :hour", { hour: hour })
    .getOne() 

  if (scheduleExists) {
    throw new AppError("Schedule to this real estate at this date and time already exists", 409)
  }

  
  const scheduleUserExists = await scheduleRepository
    .createQueryBuilder("schedule")
    .where("schedule.user.id = :userId", { userId: userId })
    .andWhere("schedule.date = :date", { date: date })
    .andWhere("schedule.hour = :hour", { hour: hour })
    .getOne()

  if (scheduleUserExists) {
    throw new AppError("User schedule to this real estate at this date and time already exists", 409)
  }

  next()

}

export default ensureTimeAvaiable