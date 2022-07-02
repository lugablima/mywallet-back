import { db, ObjectId } from "../db.js";

async function validateTokenUser(req, res, next) {
  const userID = req.header("UserID");
  try {
    const user = await db.collection("users").findOne({ _id: new ObjectId(userID) });

    if (!user) return res.sendStatus(422);

    res.locals.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export default validateTokenUser;
