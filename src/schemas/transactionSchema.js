import joi from "joi";

const transactionSchema = joi.object({
  amount: joi.number().trim().positive().required(),
  description: joi.string().trim().required(),
  type: joi.string().trim().valid("entrada", "saída").required(),
});

export default transactionSchema;
