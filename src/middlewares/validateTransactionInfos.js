import transactionSchema from "../schemas/transactionSchema.js";

async function validateTransactionInfos(req, res, next) {
  // const userExists = await db.collection("users").findOne({ _id: new ObjectId(userID) });
  const transactionInfos = req.body;
  const { error } = transactionSchema.validate(transactionInfos);

  if (error) return res.sendStatus(422);

  for (const prop in transactionInfos) {
    transactionInfos[prop] = stripHtml(transactionInfos[prop]).result.trim();
  }

  res.locals.transactionInfos = transactionInfos;
  next();
}

export default validateTransactionInfos;
