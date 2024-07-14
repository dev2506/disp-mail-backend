import { mongoClient } from "../../app";

export async function insertDocument(collection: string, doc: any) {
    const reqCollection = mongoClient.db("dis_mails_stage").collection(collection)
    await reqCollection.insertOne(doc)
}

export async function getDocument(collection: string, filters: any) {
    const reqCollection = mongoClient.db("dis_mails_stage").collection(collection)
    const document = await reqCollection.findOne(filters)
    return document
}

export async function getDocuments(collection: string, filters: any) {
    const reqCollection = mongoClient.db("dis_mails_stage").collection(collection)
    const documentsCursor = reqCollection.find(filters)
    const documents = await documentsCursor.toArray()
    return documents
}