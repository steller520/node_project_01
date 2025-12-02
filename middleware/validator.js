// middleware/validator.js joi schema validation middleware
const Joi = require('joi');

// Middleware to validate request body against a Joi schema
const validate = (schema) => (req, res, next) => {
  // Validate the request body against the provided schema
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      error: error.details[0].message,
    });
  }
  next();
};

module.exports = validate;
