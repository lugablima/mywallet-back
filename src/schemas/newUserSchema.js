import joi from "joi";

const regexName = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ\-'\s]+$/;

const newUserSchema = joi.object({
  name: joi.string().trim().pattern(regexName).required(),
  email: joi.string().trim().email().required(),
  password: joi.string().trim().required(),
  repeat_password: joi.string().trim().valid(joi.ref("password")).required(),
});

export default newUserSchema;
