import { ObjectId } from "mongodb"

export type UserDetailsSchema = {
    _id?: ObjectId
    userId: string
    createdAt: Date
    updatedAt: Date
    mail: string
}