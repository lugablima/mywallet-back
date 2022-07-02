import joi from "joi";

const infosUserSchema = joi.object({
  email: joi.string().trim().email().required(),
  password: joi.string().trim().required(),
});

export default infosUserSchema;
