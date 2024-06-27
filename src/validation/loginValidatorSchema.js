import Joi from "joi";

export const loginUserSchema = Joi.object({
    password: Joi.string().required().min(3).max(20).messages({
        'string.base': 'Password must be a type of string!',
        'string.min': 'Password must be at least {#limit} characters long!',
        'string.max': 'Password must be no more than {#limit} characters long!',
        'any.required': 'Password is required!',
    }),
    email: Joi.string().required().email().messages({
        'string.base': 'Email must be a type of string!',
        'string.email': 'Email must be a valid email!',
        'any.required': 'Email is required!',
    }),
});