import { NextFunction, Request, Response } from "express";
import { verifyJwtToken } from "../services/jwtService";

export function verifyJwtTokenHandler(req: Request, res: Response, next: NextFunction) {
    const authToken = req.headers.authorization
    const token = authToken.split("Bearer ")[1]
    const isVerified = verifyJwtToken(token, process.env.JWT_SECRET)
    if (!isVerified) {
        res.status(401).send({
            error: "Unauthorized"
        })
        return
    }
    next()
}