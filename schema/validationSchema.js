const Joi = require('joi');

const userSignupSchema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});


const userLoginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});

const createTaskSchema = Joi.object({
    title: Joi.string().min(3).max(255).required(),
    description: Joi.string().allow('', null),
    status: Joi.string().valid('TODO', 'IN_PROGRESS', 'DONE').default('TODO'),
    priority: Joi.string().valid('LOW', 'MEDIUM', 'HIGH').default('MEDIUM'),
    user_id: Joi.number().integer().required()
});

module.exports = { userSignupSchema,userLoginSchema,createTaskSchema };
