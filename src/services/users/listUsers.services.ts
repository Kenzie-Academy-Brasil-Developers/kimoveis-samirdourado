import { IUsersReturn } from "../../interfaces/users.interfaces"
import { AppDataSource } from "../../data-source"
import { User } from "../../entities"
import { Repository } from "typeorm"
import { userMultipleReturnSchema, userReturnSchema } from "../../schemas/user.schema"

const listUserService = async (): Promise<IUsersReturn> => {

    const userRepository: Repository<User> = AppDataSource.getRepository(User)

    const findUsers: Array<User> = await userRepository.find({
        withDeleted: true
    })

    const users = userMultipleReturnSchema.parse(findUsers)

    return users

}

export default listUserService