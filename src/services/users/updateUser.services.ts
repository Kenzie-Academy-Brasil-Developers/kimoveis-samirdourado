import { Repository } from "typeorm"
import { AppDataSource } from "../../data-source"
import { User } from "../../entities"
import { IUserReturn, IUserUpdate } from "../../interfaces/users.interfaces"
import { userReturnSchema } from "../../schemas/user.schema"

const updateUserService = async (userData: IUserUpdate, idUser: number): Promise<IUserReturn> => {     

    const userRepository: Repository<User> = AppDataSource.getRepository(User)

    let userInfos: User | null = await userRepository.findOneBy({
        id: idUser
    })

    userInfos = userRepository.create({...userInfos, ...userData})    

    await userRepository.save(userInfos)

    const updatedUser = userReturnSchema.parse(userInfos)

    return updatedUser
}

export default updateUserService