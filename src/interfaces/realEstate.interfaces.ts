import { z } from "zod"
import { realEstateSchema, realEstateReturnSchema, realEstateMultipleReturnSchema,  } from "../schemas/realState.schemas"

type IRealEstate = z.infer<typeof realEstateSchema>
type IRealEstateReturn = z.infer<typeof realEstateReturnSchema>
type IRealEstateAllReturn = z.infer<typeof realEstateMultipleReturnSchema>

export {
    IRealEstate,
    IRealEstateReturn,
    IRealEstateAllReturn
}