import infosUserSchema from "../schemas/infosUserSchema.js";
import db from "../db.js";

async function validateLoginUser(req, res, next) {
  const infosUser = req.body;

  const { error } = infosUserSchema.validate(infosUser);

  for (const prop in infosUser) {
    infosUser[prop] = infosUser[prop].trim();
  }

  try {
    const user = await db.collection("users").findOne(infosUser);

    if (error || !user) return res.sendStatus(422);

    res.locals.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export default validateLoginUser;
