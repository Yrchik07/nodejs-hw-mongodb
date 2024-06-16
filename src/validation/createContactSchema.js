import Joi from "joi";

export const createContactSchema = Joi.object({
    name: Joi.string().required().min(3).max(20).message({
        'any.required': '{{#label}} Name is required',
        'string.min': 'Name must be at least 3 characters long. {{#limit}}',
        'string.max': 'Name must be less than 20 characters long',
    }),
    phoneNumber: Joi.string().required().min(3).max(20),
    email: Joi.string().email().allow(null).min(3).max(20),
    isFavourite: Joi.boolean(),
    contactType: Joi.string().valid('work', 'home', 'personal').min(3).max(20),
});