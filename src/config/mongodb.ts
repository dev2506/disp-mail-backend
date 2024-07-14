import { MongoClient } from "mongodb";

const url: string = "mongodb+srv://dev-admin:Dev25062000@cluster0.6ukxabv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

export function connectToDatabase(): MongoClient {
    try {
        const client = new MongoClient(url)
        return client
    } catch (err) {
        console.error(`Error connecting to MongoDB: ${err.message}`);
    }
}