import { Request, Response } from "express";
import { ICategory } from "../interfaces/categories.interfaces";
import createCategoryService from "../services/categories/createCategory.services";
import listCategories from "../services/categories/listCategories.services";
import listCategoryFromRealEstateService from "../services/categories/listCategoryFromRealEstate.services";

const createCategoryController = async (req: Request, res: Response) => {

    const categoryData: ICategory = req.body

    const newCategory = await createCategoryService(categoryData)

    return res.status(201).json(newCategory)

}

const listCategoriesController = async (req: Request, res: Response) => {

    const categories = await listCategories()

    return res.json(categories)
}

const listCategoryFromRealEstateController = async (req: Request, res: Response) => {

    const categories = await listCategoryFromRealEstateService(req.params.id)

    return res.status(200).json(categories)
}

export {
    createCategoryController,
    listCategoriesController,
    listCategoryFromRealEstateController
}