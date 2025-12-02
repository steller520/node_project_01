const Joi = require('joi');

// Validation schema for cart operations
const cartSchema = Joi.object({
    productId: Joi.string().hex().length(24).required(),
    quantity: Joi.number().integer().min(1).required(),
});

// Schema for updating item quantity in the cart
const updateCartSchema = Joi.object({
    productId: Joi.string().hex().length(24).required(),
    quantity: Joi.number().integer().min(0).required(),
});

// Exporting the validation schemas
module.exports = {
    cartSchema,
    updateCartSchema,
};
