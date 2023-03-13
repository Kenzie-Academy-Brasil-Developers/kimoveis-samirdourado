import { Request, Response, NextFunction } from "express"
import { AppError } from "../errors"

const ensureStateKeyIsValid = async (req: Request, res: Response, next: NextFunction) => {

    const stateKey = req.body.address.state
    
    if (!stateKey) {
        throw new AppError("Informe a chave state", 404)
    }

    if (stateKey.length != 2) {
        throw new AppError("State key must be 2 characters!", 403)
    }

    return next()

}

export default ensureStateKeyIsValid