import { Request, Response, NextFunction } from "express"
import { Repository } from "typeorm"
import { AppDataSource } from "../data-source"
import { Address } from "../entities"
import { AppError } from "../errors"

const ensureAddressExists = async (req: Request, res: Response, next: NextFunction) => {

    const street = req.body.address.street
    const number = req.body.address.number
    const city = req.body.address.city

    const addressRepository: Repository<Address> = AppDataSource.getRepository(Address)

    const findAddresAndNumber = await addressRepository.findOneBy({
        street: street,
        number: number,
        city: city
    })     

    if (findAddresAndNumber) {
        throw new AppError("Address already exists", 409)
    }

    return next()

}

export default ensureAddressExists