import Joi from "joi";

export const registerUserSchema = Joi.object({
  name: Joi.string().required().min(3).max(20).messages({
    'string.base': 'Name must be a type of string!',
    'string.min': 'Name must be at least {#limit} characters long!',
    'string.max': 'Name must be no more than {#limit} characters long!',
    'any.required': 'Name is required!',
  }),
  email: Joi.string().email().required().messages({
    'string.base': 'Email must be a type of string!',
    'string.email': 'Email must be a valid email!',
    'any.required': 'Email is required!',
  }),
  password: Joi.string().required().min(3).max(20).messages({
    'string.base': 'Password must be a type of string!',
    'string.min': 'Password must be at least {#limit} characters long!',
    'string.max': 'Password must be no more than {#limit} characters long!',
    'any.required': 'Password is required!',
}),
});

