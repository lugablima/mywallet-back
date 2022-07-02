import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const mongoClient = new MongoClient(process.env.MONGO_DB_URI);
let db = null;
const objectId = ObjectId();

mongoClient.connect(() => {
  db = mongoClient.db(process.env.MONGO_DB_NAME);
});

export default { db, objectId };
