import app from "./app"
import { AppDataSource } from "./data-source"

AppDataSource.initialize().then(() => {
    console.log("Databse connected 🔑")
    app.listen(3000, () => {
        console.log("Server is runnig 🕋")
    })    
}).catch(err => {
    console.error(err)
})
