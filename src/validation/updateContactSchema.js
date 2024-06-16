import Joi from "joi";

export const updateContactSchema = Joi.object({
    name: Joi.string().min(3).max(20),
    phoneNumber: Joi.string().min(3).max(20),
    email: Joi.string().email().allow(null).min(3).max(20),
    isFavourite: Joi.boolean(),
    contactType: Joi.string().valid('work', 'home', 'personal').min(3).max(20),
});