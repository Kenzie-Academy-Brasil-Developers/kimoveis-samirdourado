import { Repository } from "typeorm"
import { AppDataSource } from "../../data-source"
import { Category } from "../../entities"
import { ICategory } from "../../interfaces/categories.interfaces"
import { categoryReturnSchema } from "../../schemas/categories.schemas"

const createCategoryService = async (categoryData: ICategory) => {

    const categoryRepository: Repository<Category> = AppDataSource.getRepository(Category)

    const category: Category = categoryRepository.create(categoryData)

    await categoryRepository.save(category)

    const newCategory = categoryReturnSchema.parse(category)

    return newCategory

}

export default createCategoryService