import joi from "joi";

const loginUserSchema = joi.object({
  email: joi.string().trim().email().required(),
  password: joi.string().trim().required(),
});

export default loginUserSchema;
