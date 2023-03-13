
import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";

const ensureDateAvaiable = async (req: Request, res: Response, next: NextFunction) => {  

    const date = new Date(req.body.date)

    const newDate = date.toString().split(" ")

    const avaiableDate = newDate[0] == "Sat" || newDate[0] == "Sun"

    if (!avaiableDate) {
      throw new AppError("Invalid hour, available times are 8AM to 18PM", 403)
    }

    if (avaiableDate) {
      throw new AppError("User schedule to this real estate at this date and time already exists", 403)
    }

}

export default ensureDateAvaiable