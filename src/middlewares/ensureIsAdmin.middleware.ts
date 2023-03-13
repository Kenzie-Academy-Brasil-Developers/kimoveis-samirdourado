import { Request, Response, NextFunction } from "express"
import { AppError } from "../errors"

const ensureIsAdminMiddleware = async (req: Request, res: Response, next: NextFunction) => {    

    if (!req.user) {
        throw new AppError("Authentication Required", 401)
    }

    const autehnticatedUser = req.user.admin    

    if (autehnticatedUser === false) {
        throw new AppError("Insufficient permission", 403)
    }
    
    return next()
}

export default ensureIsAdminMiddleware