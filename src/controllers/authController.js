import db from "../db.js";

export async function signUp(req, res) {
  try {
    const newUser = res.locals.newUser;

    await db.collection("users").insertOne(newUser);

    res.status(201).send(newUser);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function signIn(req, res) {
  try {
    const user = res.locals.user;

    res.status(200).send(user);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
