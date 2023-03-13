import { Request, Response } from "express";
import { IRealEstate } from "../interfaces/realEstate.interfaces";
import createRealEstateService from "../services/realEstate/createRealEstate.services";
import listAllRealStatesService from "../services/realEstate/listAllRealEstate.services";

const createRealEstateController = async (req: Request, res: Response) => {

    const realEstateData: IRealEstate = req.body

    const newRealEstate = await createRealEstateService(realEstateData)

    return res.status(201).json(newRealEstate)
}

const listAllRealEstateController = async (req: Request, res: Response) => {

    const realEstate = await listAllRealStatesService()

    return res.json(realEstate)
}

export {
    createRealEstateController,
    listAllRealEstateController
}