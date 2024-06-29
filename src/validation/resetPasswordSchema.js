import Joi from "joi";

export const resetPasswordSchema = Joi.object({
  password: Joi.string().required().min(3).max(20).messages({
    'string.base': 'Password must be a type of string!',
    'string.min': 'Password must be at least {#limit} characters long!',
    'string.max': 'Password must be no more than {#limit} characters long!',
    'any.required': 'Password is required!',
}),
  token: Joi.string().required().messages({
    'string.base': 'Token must be a type of string!',
    'any.required': 'Token is required!',
  }),
});

