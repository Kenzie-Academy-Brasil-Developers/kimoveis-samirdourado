import { Request, Response, NextFunction } from "express"
import { ZodTypeAny } from "zod"
import { AppError } from "../errors"
import { IUser } from "../interfaces/users.interfaces"

const ensureDataIsValidMiddleware = (schema: ZodTypeAny) => (req: Request, res: Response, next: NextFunction) => {
    
    const validateData: Partial<IUser> = schema.parse(req.body)

    req.body = validateData

    return next()
}

export default ensureDataIsValidMiddleware