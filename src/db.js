import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const mongoClient = new MongoClient(process.env.MONGO_DB_URI);

await mongoClient.connect();

const db = mongoClient.db(process.env.MONGO_DB_NAME);

export default db;
