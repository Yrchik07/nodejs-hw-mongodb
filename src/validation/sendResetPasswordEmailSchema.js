import Joi from "joi";

export const setResetPasswordSchema = Joi.object({
    email: Joi.string().required().email().messages({
        'string.base': 'Email must be a type of string!',
        'string.email': 'Email must be a valid email!',
        'any.required': 'Email is required!',
    }),
});