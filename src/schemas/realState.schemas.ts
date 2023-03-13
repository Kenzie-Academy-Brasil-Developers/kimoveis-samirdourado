import { union, z } from "zod"
import { categoryReturnSchema } from "./categories.schemas"
import { addressSchema, addressReturnSchema } from "./adresses.schemas"

const realEstateSchema = z.object({
    sold: z.boolean().optional().default(false),
    // value: z.number(),
    value: union([
        z.string().min(2).max(9999999.99).transform((element)=> parseFloat(element).toFixed(2)),
        z.number().min(2).max(9999999.99).transform((element)=> parseFloat(element.toFixed(2)))
    ]),
    size: z.number().positive().int(),
    address: addressSchema,
    categoryId: z.number()
})

const realEstateReturnSchema = realEstateSchema.extend({
    id: z.number().positive(),
    createdAt: z.string(),
    updatedAt: z.string(),
    address: addressReturnSchema,
    category: categoryReturnSchema
}).omit({
    categoryId: true
})


const realEstateMultipleReturnSchema = realEstateReturnSchema.omit({
    category: true
})

export {
    realEstateSchema,
    realEstateReturnSchema,
    realEstateMultipleReturnSchema
}