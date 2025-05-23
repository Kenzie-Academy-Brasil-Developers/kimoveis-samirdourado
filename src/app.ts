import "express-async-errors"
import express, { Application} from "express"
import { handleErros } from "./errors"
import userRoutes from "./routers/users.routes"
import loginRoutes from "./routers/login.routes"
import categoryRoutes from "./routers/categories.routes"
import realEstateRoutes from "./routers/realEstate.routes"
import schedulesRoutes from "./routers/schedules.routes"

const app: Application = express()
app.use(express.json())
app.use("/users", userRoutes)
app.use("/login", loginRoutes)
app.use("/categories", categoryRoutes)
app.use("/realEstate", realEstateRoutes)
app.use("/schedules", schedulesRoutes)
app.use(handleErros)

export default app