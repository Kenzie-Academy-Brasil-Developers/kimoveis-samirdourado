import { Repository } from "typeorm"
import { AppDataSource } from "../../data-source"
import { Category, RealEstate } from "../../entities"
import { AppError } from "../../errors"

const listCategoryFromRealEstateService = async (idParams: any) => {

    const categoryRepository: Repository<Category> = AppDataSource.getRepository(Category)
    const realEstateRepository: Repository<RealEstate> = AppDataSource.getRepository(RealEstate)
    const idCategory = idParams
    
    const category = await categoryRepository.findOne({
        where: {
            id: parseInt(idCategory)
        }
    }) 

    if (!category) {
        throw new AppError("Category not found", 404)
    }   

    const findProperties = await realEstateRepository.find({
        where: {
            category: category
        }
    })    

    return {
        id: category?.id,
        name: category?.name,
        realEstate: [...findProperties],
    }

}

export default listCategoryFromRealEstateService