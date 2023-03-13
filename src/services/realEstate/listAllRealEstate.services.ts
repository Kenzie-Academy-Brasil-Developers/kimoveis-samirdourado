import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { RealEstate } from "../../entities";

const listAllRealStatesService = async (): Promise<RealEstate[]> => {

    const realEstateRepository: Repository<RealEstate> = AppDataSource.getRepository(RealEstate)

    const findRealEstate = await realEstateRepository.find({
        relations: {
            address: true,
        },
    })    

    return findRealEstate
    
}

export default listAllRealStatesService