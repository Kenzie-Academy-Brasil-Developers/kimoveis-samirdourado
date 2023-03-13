import { Request, Response } from "express";
import createScheduleService from "../services/schedules/createSchedules.services";
import listSchedulesByRealEstateIdService from "../services/schedules/listSchedules.services";

const createScheduleController = async (req: Request, res: Response) => {

    const scheduleData = req.body    

    const userAuth = req.user.id

    await createScheduleService(scheduleData, userAuth)

    return res.status(201).send({message: "Schedule created"})

}

const listSchedulesController = async (req: Request, res: Response): Promise<Response> => {

    const idParams: number = parseInt(req.params.id)

    const realEstateId = await listSchedulesByRealEstateIdService(idParams)

    return res.status(200).send(realEstateId)
    
}

export {
    createScheduleController,
    listSchedulesController
}