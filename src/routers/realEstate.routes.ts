import { Router } from "express"
import { createRealEstateController, listAllRealEstateController } from "../controllers/realEstate.controllers"
import ensureAddressExists from "../middlewares/ensureAddressExists.middleware"
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middlewares"
import ensureIsAdminMiddleware from "../middlewares/ensureIsAdmin.middleware"
import ensureStateKeyIsValid from "../middlewares/ensureStateKeyIsValid"
import ensureTokenIsValidMiddleware from "../middlewares/ensureTokenisValid.middleware"
import { realEstateSchema } from "../schemas/realState.schemas"

const realEstateRoutes: Router = Router()

realEstateRoutes.post("", ensureTokenIsValidMiddleware, ensureIsAdminMiddleware, ensureDataIsValidMiddleware(realEstateSchema), ensureAddressExists, ensureStateKeyIsValid, createRealEstateController)
realEstateRoutes.get("", listAllRealEstateController)

export default realEstateRoutes