import db from "../db.js";
import dayjs from "dayjs";

export async function getExtract(req, res) {
  try {
    const userId = res.locals.userId;

    const extract = await db.collection("extracts").find({ userId }).toArray();

    res.status(200).send(extract);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function addTransaction(req, res) {
  try {
    const { userId, transactionInfos } = res.locals;

    await db.collection("extracts").insertOne({ ...transactionInfos, userId, date: dayjs().format("DD/MM") });

    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
