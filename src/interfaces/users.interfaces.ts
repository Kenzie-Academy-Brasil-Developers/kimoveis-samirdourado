import { userSchema, userReturnSchema, userMultipleReturnSchema, userUpdateSchema } from "../schemas/user.schema"
import { z } from "zod"
import { DeepPartial } from "typeorm"

type IUser = z.infer<typeof userSchema>
type IUserReturn = z.infer<typeof userReturnSchema>
type IUsersReturn = z.infer<typeof userMultipleReturnSchema>
type IUserUpdate = DeepPartial<IUser>

export {
    IUser, 
    IUserReturn,
    IUsersReturn,
    IUserUpdate
}