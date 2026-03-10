require("dotenv").config();
const app = require("./src/app");
const connectDb = require("./src/config/database");


async function startServer() {
    try {
        await connectDb();
        app.listen(process.env.PORT, () => {
            console.log(`Server is listening for ${process.env.PORT}`)
        })
    } catch (error) {
        console.log("Error in starting server !");
        console.log(error)
    }
}

startServer();