import joi from "joi";

const newUserSchema = joi.object({
  name: joi
    .string()
    .trim()
    .pattern(/^[a-zA-Z]{3, 30}$/)
    .required(),
  email: joi.string().trim().email().required(),
  password: joi.string().trim().required(),
  repeat_password: joi.ref("password").required(),
});

export default newUserSchema;
