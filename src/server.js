import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { MongoClient, ObjectId } from "mongodb";
import joi from "joi";
import dayjs from "dayjs";
import { stripHtml } from "string-strip-html";

const server = express();

server.use([json(), cors()]);
dotenv.config();

const mongoClient = new MongoClient(process.env.MONGO_DB_URI);
let db = null;

/* Users routes */

server.post("/sign-up", async (req, res) => {
  const newUser = req.body;

  const newUserSchema = joi.object({
    name: joi
      .string()
      .trim()
      .pattern(/^[a-zA-Z]{3, 30}$/)
      .required(),
    email: joi.string().trim().email().required(),
    password: joi.string().trim().required(),
    repeat_password: joi.ref("password").required(),
  });

  const { error } = newUserSchema.validate(newUser);

  if (error) return res.sendStatus(422);

  for (const prop in newUser) {
    newUser[prop] = newUser[prop].trim();
  }

  try {
    await mongoClient.connect();
    db = mongoClient.db(process.env.MONGO_DB_NAME);

    const userAlreadyExists = await db.collection("users").findOne({ name: newUser.name });

    if (userAlreadyExists) return res.sendStatus(409);

    await db.collection("users").insertOne(newUser);

    res.status(201).send(newUser);
    mongoClient.close();
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
    mongoClient.close();
  }
});

server.post("/sign-in", async (req, res) => {
  const infosUser = req.body;

  try {
    await mongoClient.connect();
    db = mongoClient.db(process.env.MONGO_DB_NAME);

    const infosUserSchema = joi.object({
      email: joi.string().trim().email().required(),
      password: joi.string().trim().required(),
    });

    const { error } = infosUserSchema.validate(infosUser);

    for (const prop in infosUser) {
      infosUser[prop] = infosUser[prop].trim();
    }

    const user = await db.collection("users").findOne(infosUser);

    if (error || !user) return res.sendStatus(422);

    res.status(200).send(user);
    mongoClient.close();
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
    mongoClient.close();
  }
});

/* Extracts routes */

server.get("/extract", async (req, res) => {
  const userID = req.header("UserID");

  try {
    await mongoClient.connect();
    db = mongoClient.db(process.env.MONGO_DB_NAME);

    const user = await db.collection("users").findOne({ _id: new ObjectId(userID) });

    if (!user) return res.sendStatus(422);

    const extract = await db.collection("extracts").find({ userID: user._id }).toArray();

    res.status(200).send(extract);
    mongoClient.close();
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
    mongoClient.close();
  }
});

server.post("/extract", async (req, res) => {
  const userID = req.header("UserID");
  const transactionInfos = req.body;

  try {
    await mongoClient.connect();
    db = mongoClient.db(process.env.MONGO_DB_NAME);

    const userExists = await db.collection("users").findOne({ _id: new ObjectId(userID) });

    const transactionInfosSchema = joi.object({
      amount: joi.number().trim().positive().required(),
      description: joi.string().trim().required(),
      type: joi.string().trim().valid("entrada", "saída").required(),
    });

    const { error } = transactionInfosSchema.validate(transactionInfos);

    if (!userExists || error) return res.sendStatus(422);

    for (const prop in transactionInfos) {
      transactionInfos[prop] = stripHtml(transactionInfos[prop]).result.trim();
    }

    await db
      .collection("extracts")
      .insertOne({ ...transactionInfos, userID: new ObjectId(userID), date: dayjs().format("DD/MM") });

    res.sendStatus(201);
    mongoClient.close();
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
    mongoClient.close();
  }
});

const PORT_SERVER = process.env.PORT_SERVER || 5001;

server.listen(PORT_SERVER, () => {
  console.log(`The server is listening in http://localhost:${PORT_SERVER}`);
});
