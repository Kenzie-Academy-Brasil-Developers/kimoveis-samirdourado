import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Category } from "../../entities";
import { ICategoriesReturn } from "../../interfaces/categories.interfaces";
import { categoryMultipleReturnSchema } from "../../schemas/categories.schemas";

const listCategories = async (): Promise<ICategoriesReturn> => {

    const categoryRepository: Repository<Category> = AppDataSource.getRepository(Category)

    const findCategories: Array<Category> = await categoryRepository.find()

    const categories = categoryMultipleReturnSchema.parse(findCategories)

    return categories
}

export default listCategories