import Joi from "joi";

export const updateContactSchema = Joi.object({
    name: Joi.string().min(3).max(20).messages({
        'string.base': 'Name must be a type of string!',
        'string.min': 'Name must be at least {#limit} characters long!',
        'string.max': 'Name must be no more than {#limit} characters long!',
        'any.required': 'Name is required!',
      }),
    phoneNumber: Joi.string().min(3).max(20).messages({
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