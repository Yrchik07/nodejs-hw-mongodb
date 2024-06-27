import Joi from "joi";

export const createContactSchema = Joi.object({
    name: Joi.string().required().min(3).max(20).message({
        'any.required': '{{#label}} Name is required',
        'string.min': 'Name must be at least 3 characters long. {{#limit}}',
        'string.max': 'Name must be less than 20 characters long',
    }),
    phoneNumber: Joi.string().required().min(3).max(20).messages({
        'string.base': 'Phone number must be a type of string!',
        'string.min': 'Phone number must be at least {#limit} characters long!',
        'string.max': 'Phone number must be no more than {#limit} characters long!',
        'any.required': 'Phone number is required!',
      }),
    email: Joi.string().email().allow(null).min(3).max(20).messages({
        'string.base': 'Email must be a type of string!',
        'string.email': 'Email must be a valid email!',
        'any.required': 'Email is required!',
      }),
    isFavourite: Joi.boolean(),
    contactType: Joi.string().valid('work', 'home', 'personal').min(3).max(20),
});