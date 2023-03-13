import { hashSync } from "bcryptjs"
import { z } from "zod"

const userSchema = z.object({    
    name: z.string().max(45),
    email: z.string().email().max(45),
    password: z.string().max(120),
    admin: z.boolean().optional().default(false),
})

const userUpdateSchema = userSchema.omit({ admin: true }).partial()

const userReturnSchema = userSchema.extend({
    id: z.number(),
    createdAt: z.string(),
    updatedAt: z.string(),
    deletedAt: z.string().nullable(),
}).omit({password: true})


const userMultipleReturnSchema = userReturnSchema.array()

export {
    userSchema,
    userReturnSchema,
    userMultipleReturnSchema,
    userUpdateSchema
} 