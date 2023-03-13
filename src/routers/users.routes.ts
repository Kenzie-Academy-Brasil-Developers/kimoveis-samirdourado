import { Router } from "express"
import { createUserController, deleteUserController, listUsersController, updateUserController } from "../controllers/users.controllers"
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middlewares"
import ensureEmailExistsMiddleware from "../middlewares/ensureEmailExists.middleware"
import ensureIsAdminMiddleware from "../middlewares/ensureIsAdmin.middleware"
import ensureIsAdminOrLoggedIn from "../middlewares/ensureIsAdminOrLoggedUser.middleware"
import ensureTokenIsValidMiddleware from "../middlewares/ensureTokenisValid.middleware"
import ensureUserExistsMiddleware from "../middlewares/ensureUserExists.middleware"
import { userSchema, userUpdateSchema } from "../schemas/user.schema"

const userRoutes: Router = Router()

userRoutes.post("", ensureDataIsValidMiddleware(userSchema), ensureEmailExistsMiddleware, createUserController)
userRoutes.get("", ensureTokenIsValidMiddleware, ensureIsAdminMiddleware, listUsersController)
userRoutes.delete("/:id", ensureUserExistsMiddleware, ensureTokenIsValidMiddleware, ensureIsAdminMiddleware, deleteUserController)
userRoutes.patch("/:id", ensureTokenIsValidMiddleware, ensureUserExistsMiddleware, ensureIsAdminOrLoggedIn, ensureDataIsValidMiddleware(userUpdateSchema), ensureEmailExistsMiddleware, updateUserController)

export default userRoutes