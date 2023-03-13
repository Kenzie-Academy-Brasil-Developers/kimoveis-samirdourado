import { Repository } from "typeorm"
import { AppDataSource } from "../../data-source"
import { Address, Category, RealEstate } from "../../entities"
import { AppError } from "../../errors"
import { ICategory } from "../../interfaces/categories.interfaces"
import { IRealEstate, IRealEstateReturn} from "../../interfaces/realEstate.interfaces"
import { realEstateReturnSchema } from "../../schemas/realState.schemas"

const createRealEstateService = async (realEstateData: IRealEstate): Promise<IRealEstateReturn> => {    

    const realEstateRepository: Repository<RealEstate> = AppDataSource.getRepository(RealEstate)
    const addressessRepository: Repository<Address> = AppDataSource.getRepository(Address)    
    const categoryRepository: Repository<Category> = AppDataSource.getRepository(Category)   

    const address: Address = addressessRepository.create(realEstateData.address)

    const category = await categoryRepository.findOneBy({
        id: realEstateData.categoryId
    }) as ICategory

    if (!category) {
        throw new AppError("Category not found", 404)
    }

    await addressessRepository.save(address)

    const realState = realEstateRepository.create({
        ...realEstateData,
        address: address,
        category: category
    })
    
    await realEstateRepository.save(realState)
    
    const newRealEstate = realEstateReturnSchema.parse(realState)    
    
    return newRealEstate
}

export default createRealEstateService