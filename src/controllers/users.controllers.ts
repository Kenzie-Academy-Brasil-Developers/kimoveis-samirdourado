import { Request, Response } from "express"
import createUserService from "../services/users/createUser.services"
import deleteUserService from "../services/users/deleteUser.services"
import listUserService from "../services/users/listUsers.services"
import updateUserService from "../services/users/updateUser.services"

const createUserController = async (req: Request, res: Response): Promise<Response> => {

    const userData = req.body

    const newUser = await createUserService(userData)

    return res.status(201).json(newUser)
}

const listUsersController = async (req: Request, res: Response) => {
    
    const users = await listUserService()

    return res.status(200).json(users)
}

const deleteUserController = async (req: Request, res: Response) => {
    
    await deleteUserService(parseInt(req.params.id))

    return res.status(204).send()
}

const updateUserController = async (req: Request, res: Response) => {

    const userData = req.body

    const idUser = parseInt(req.params.id)

    const updatedUser = await updateUserService(userData, idUser)

    return res.status(200).json(updatedUser)
}

export {
    createUserController,
    listUsersController,
    deleteUserController,
    updateUserController,
}