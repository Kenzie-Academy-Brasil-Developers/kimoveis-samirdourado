import { Request, Response, NextFunction } from "express"
import { AppError  } from "../errors"

const ensureIsAdminOrLoggedIn = async (req: Request, res: Response, next: NextFunction) => {

    const admin = req.user.admin

    const userId = req.user.id

    const paramId = Number(req.params.id)
    

    if (admin) {
        return next()    
    } else if (!admin && userId === paramId) {
        return next()
    } else {
        throw new AppError("Insufficient permission", 403)
    }

}

export default ensureIsAdminOrLoggedIn