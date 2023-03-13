import { IUser } from "../../interfaces/users.interfaces"
import { AppDataSource } from "../../data-source"
import { User } from "../../entities"
import { Repository } from "typeorm"
import { userReturnSchema } from "../../schemas/user.schema"
import { AppError } from "../../errors"

const createUserService = async (userData: IUser) => {

    const userRepository: Repository<User> = AppDataSource.getRepository(User)

    const user = userRepository.create(userData)
    
    if (!user) {
        throw new AppError("Not creates", 400)
    }

    await userRepository.save(user)

    const newUser = userReturnSchema.parse(user)

    return newUser

}

export default createUserService