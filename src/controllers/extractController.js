import { db, ObjectId } from "../db.js";

export async function getExtract(req, res) {
  try {
    const user = res.locals.user;

    const extract = await db.collection("extracts").find({ userID: user._id }).toArray();

    res.status(200).send(extract);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function addTransaction(req, res) {
  //const userID = req.header("UserID");
  try {
    const transactionInfos = res.locals.transactionInfos;

    await db
      .collection("extracts")
      .insertOne({ ...transactionInfos, userID: new ObjectId(userID), date: dayjs().format("DD/MM") });

    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
