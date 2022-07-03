import transactionSchema from "../schemas/transactionSchema.js";
import { stripHtml } from "string-strip-html";

async function validateTransactionInfos(req, res, next) {
  const userId = res.locals.userId;
  const transactionInfos = req.body;

  const { error } = transactionSchema.validate(transactionInfos);

  if (error) return res.sendStatus(422);

  transactionInfos.description = stripHtml(transactionInfos.description).result.trim();
  transactionInfos.type = transactionInfos.type.trim();

  res.locals = { transactionInfos, userId };
  next();
}

export default validateTransactionInfos;
