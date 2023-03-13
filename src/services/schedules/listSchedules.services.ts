import { Repository } from "typeorm"
import { AppDataSource } from "../../data-source"
import { RealEstate } from "../../entities"
import { AppError } from "../../errors"

const listSchedulesByRealEstateIdService = async (realEstateId: number) => {    

    const realEstateRepository: Repository<RealEstate> = AppDataSource.getRepository(RealEstate)
    
    const findRealEstate = await  realEstateRepository.findOne({
        where: { id: realEstateId},
        relations: {
            address: true,
            category: true,
            schedules: {
                user: true
            },
        },
    })

    if (!findRealEstate) {
        throw new AppError("RealEstate not found", 404)
    }

    return findRealEstate
}

export default listSchedulesByRealEstateIdService 