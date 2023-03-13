import { z } from "zod";
import { schedulesSchema } from "../schemas/schedules.schemas";

type ISchedule = z.infer<typeof schedulesSchema>

export {
    ISchedule
}