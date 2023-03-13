import { Request, Response, NextFunction } from "express"
import { Repository } from "typeorm"
import { string } from "zod"
import { AppDataSource } from "../data-source"
import { User } from "../entities"
import { AppError } from "../errors"
import { userSchema } from "../schemas/user.schema"

const ensureCorrectBodyMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    const userData = req.body

    if (typeof(userData.name && userData.email && userData.password) == "number" || "array") {
        throw new AppError("Not possible create", 400)
    }

    return next()

}

export default ensureCorrectBodyMiddleware