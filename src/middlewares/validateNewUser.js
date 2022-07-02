import newUserSchema from "../schemas/newUserSchema.js";
import db from "../db.js";

async function validateNewUser(req, res, next) {
  const newUser = req.body;

  const { error } = newUserSchema.validate(newUser);

  if (error) return res.sendStatus(422);

  for (const prop in newUser) {
    newUser[prop] = newUser[prop].trim();
  }

  try {
    const userAlreadyExists = await db.collection("users").findOne({ name: newUser.name });

    if (userAlreadyExists) return res.sendStatus(409);

    res.locals.newUser = newUser;
    next();
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export default validateNewUser;
