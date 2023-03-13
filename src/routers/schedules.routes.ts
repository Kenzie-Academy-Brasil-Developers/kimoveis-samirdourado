import { Router } from "express"
import { createScheduleController, listSchedulesController } from "../controllers/schedules.controllers"
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middlewares"
import ensureIsAdminMiddleware from "../middlewares/ensureIsAdmin.middleware"
import ensureTimeAvaiable from "../middlewares/ensureTimeIsValid.middleware"
import ensureTokenIsValidMiddleware from "../middlewares/ensureTokenisValid.middleware"
import { schedulesSchema } from "../schemas/schedules.schemas"

const schedulesRoutes: Router = Router()

schedulesRoutes.post("", ensureTokenIsValidMiddleware, ensureDataIsValidMiddleware(schedulesSchema), ensureTimeAvaiable, createScheduleController )
schedulesRoutes.get("/realEstate/:id", ensureTokenIsValidMiddleware, ensureIsAdminMiddleware, listSchedulesController )

export default schedulesRoutes


