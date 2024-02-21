import Joi from 'joi';

const loginSchema = Joi.object({
    username: Joi.string().trim().required(),
    password: Joi.string().trim().required(),
});

const registerSchema = Joi.object({
    username: Joi.string().trim().required(),
    email: Joi.string().trim().required(),
    password: Joi.string().trim().required(),
    stayConnected: Joi.boolean(),
});

export { loginSchema, registerSchema };