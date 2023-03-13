import { z } from "zod"

const schedulesSchema = z.object({
    date: z.string(),
    hour: z.string(),
    realEstateId: z.number().positive().int()
})

const scheduleReturnSchema = schedulesSchema.extend({
    id: z.number()
})

export {
    schedulesSchema,
    scheduleReturnSchema,    
}