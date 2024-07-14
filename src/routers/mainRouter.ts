import { NextFunction, Request, Response, Router } from "express";
import { verifyJwtTokenHandler } from "../middlewares/verifyJwtToken";
import { decodeJwtToken } from "../services/jwtService";
import { createUserController, getMailsController } from "../controllers/mainController";

export const mainRouter: Router = Router()

mainRouter.post("/user", async (req: Request, res: Response, next: NextFunction) => {
    const response = await createUserController()
    res.status(201).send(response)
})

mainRouter.get("/mails", verifyJwtTokenHandler, async (req: Request, res: Response, next: NextFunction) => {
    const authToken = req.headers.authorization
    const token = authToken.split("Bearer ")[1]
    const decodedPayload = decodeJwtToken(token)
    const userId = decodedPayload.userId
    const response = await getMailsController(userId)
    res.status(200).send(response)
})