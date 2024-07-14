import { adjectives, nouns } from "../constants/mailprefix";

export function createRandomMail() {
    const domain = "ambitiouswolf.tech"
    const randAdjInd = Math.floor(Math.random() * adjectives.length)
    const randNounInd = Math.floor(Math.random() * nouns.length)
    const randNumber = 1 + Math.floor(Math.random() * 999)
    const randomEmail = adjectives[randAdjInd].toLowerCase() + nouns[randNounInd].toLowerCase() + randNumber.toString()
    return `${randomEmail}@${domain}`
}