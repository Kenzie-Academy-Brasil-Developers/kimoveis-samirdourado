import { z } from "zod"

const categorySchema = z.object({
    name: z.string().min(3).max(45)
})

const categoryReturnSchema = categorySchema.extend({
    id: z.number()
})

const categoryMultipleReturnSchema = categoryReturnSchema.array()

export {
    categorySchema,
    categoryReturnSchema,
    categoryMultipleReturnSchema
}