import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import joi from "joi";

const server = express();

server.use([json(), cors()]);
dotenv.config();

const mongoClient = new MongoClient(process.env.MONGO_DB_URI);
let db = null;

const PORT_SERVER = process.env.PORT_SERVER || 5001;

server.listen(PORT_SERVER, () => {
  console.log(`The server is listening in http://localhost:${PORT_SERVER}`);
});
