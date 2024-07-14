import { UserDetailsSchema } from "../schema/userDetails"
import { createJWTToken } from "../services/jwtService"
import { createRandomMail } from "../services/mainService"
import { getDocument, getDocuments, insertDocument } from "../services/mongodbService"

export async function createUserController() {
    const random = Math.random()
    const min = 1000000
    const max = 9900000
    const userId = Date.now().toString() + min + Math.floor(random * (max - min))

    const jwtToken = createJWTToken(userId, process.env.JWT_SECRET)
    const mail = createRandomMail()
    await insertDocument("user_details", <UserDetailsSchema>{
        userId,
        mail,
        createdAt: new Date(),
        updatedAt: new Date(),
    })
    return {
        jwtToken,
        mail
    }
}

export async function getMailsController(userId: string) {
    const user = await getDocument("user_details", {userId})
    const mails = await getDocuments("mails", {receiverMail: user.mail})
    return mails
}