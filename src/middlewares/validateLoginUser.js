import loginUserSchema from "../schemas/loginUserSchema.js";
import db from "../db.js";
import bcrypt from "bcrypt";

async function validateLoginUser(req, res, next) {
  const infosUser = req.body;

  const { error } = loginUserSchema.validate(infosUser);

  if (error) return res.sendStatus(422);

  for (const prop in infosUser) {
    infosUser[prop] = infosUser[prop].trim();
  }

  try {
    const user = await db.collection("users").findOne({ email: infosUser.email });

    if (user && bcrypt.compareSync(infosUser.password, user.password)) {
      res.locals.user = user;
      next();
    } else {
      res.status(401).send("E-mail e/ou senha inválido(s)!");
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export default validateLoginUser;
