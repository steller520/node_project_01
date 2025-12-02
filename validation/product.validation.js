const Joi = require('joi');

const productSchema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().positive().required(),
    description: Joi.string(),
    stock: Joi.number().integer().min(0).required(),
});

module.exports = {
    productSchema,
};
