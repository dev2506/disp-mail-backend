import express from "express"
import { connectToDatabase } from "./src/config/mongodb"
import { mainRouter } from "./src/routers/mainRouter"
import * as dotenv from "dotenv"

const nodeEnv = process.env.NODE_ENV
dotenv.config({path: `${__dirname}/../env/${nodeEnv}.env`})

const app = express()

export const mongoClient = connectToDatabase()

app.use('/api/v1/health', (req, res, next) => {
    res.status(200).send('Healthy!!!')
})

app.use('/api/v1', mainRouter)

app.listen(3000, () => {
    console.log("Server running...")
})