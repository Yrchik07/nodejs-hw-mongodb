import Joi from "joi";

export const setResedPasswordSchema = Joi.object({
    email: Joi.string().required().email(),
});