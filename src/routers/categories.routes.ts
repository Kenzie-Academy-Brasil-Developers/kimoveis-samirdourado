import { Router } from "express"
import { createCategoryController, listCategoriesController, listCategoryFromRealEstateController } from "../controllers/categories.controllers"
import ensureCategoryExistsMiddleware from "../middlewares/ensureCategoryExists.middleware"
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middlewares"
import ensureIsAdminMiddleware from "../middlewares/ensureIsAdmin.middleware"
import ensureTokenIsValidMiddleware from "../middlewares/ensureTokenisValid.middleware"
import { categorySchema } from "../schemas/categories.schemas"

const categoryRoutes: Router = Router()

categoryRoutes.post("", ensureTokenIsValidMiddleware, ensureIsAdminMiddleware, ensureCategoryExistsMiddleware, ensureDataIsValidMiddleware(categorySchema), createCategoryController)
categoryRoutes.get("", listCategoriesController)
categoryRoutes.get("/:id/realEstate", listCategoryFromRealEstateController )

export default categoryRoutes
