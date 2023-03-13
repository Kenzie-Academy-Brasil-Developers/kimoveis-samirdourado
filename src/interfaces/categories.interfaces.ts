import {categorySchema, categoryReturnSchema, categoryMultipleReturnSchema} from "../schemas/categories.schemas"
import { z } from "zod"

type ICategory = z.infer<typeof categorySchema>
type ICategoryReturn = z.infer<typeof categoryReturnSchema>
type ICategoriesReturn = z.infer<typeof categoryMultipleReturnSchema>

export {
    ICategory,
    ICategoryReturn,
    ICategoriesReturn
}