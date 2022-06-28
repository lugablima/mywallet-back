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

    const user = await db.collection("users").findOne(infosUser);

    if (error || !user) return res.sendStatus(422);

    res.status(200).send(user);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

const PORT_SERVER = process.env.PORT_SERVER || 5001;

server.listen(PORT_SERVER, () => {
  console.log(`The server is listening in http://localhost:${PORT_SERVER}`);
});
