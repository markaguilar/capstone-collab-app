import * as yup from "yup";

export const loginSchemaValidation = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
  // rememberMe: yup.boolean(),
});

export const registerSchemaValidation = yup.object({
  name: yup.string().required(),
  username: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
  role: yup.string().required(),
});
