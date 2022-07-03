import db from "../db.js";

async function validateTokenUser(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  if (!token) return res.sendStatus(401);

  try {
    const session = await db.collection("sessions").findOne({ token });

    if (!session) return res.sendStatus(401);

    res.locals.userId = session.userId;
    next();
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export default validateTokenUser;
