const Joi = require('joi') 

const schemas = { 
  order: Joi.object({
    date: Joi.string()
      .replace("/", "-")
      .isoDate()
      .empty("")
      .required()
      .messages({
        "string.isoDate": "Please enter a date in the format yyyy-mm-dd.",
        "any.required": "Please enter a date in the format yyyy-mm-dd.",
      }),
    size: Joi.any()
      .valid("small", "medium", "large", "extra-large")
      .empty("")
      .required()
      .messages({
        "any.only": "Please choose one of the given sizes.",
      }),
    gluten_free: Joi.any()
      .valid("true", "undefined")
      .default("false")
      .messages({
        "any.only": "Please choose one of the given gluten-free crust options.",
      }),
    toppings: Joi.array()
      .min(2)
      .max(4)
      .empty("")
      .required()
      .items(
        Joi.string().valid(
          "tomato sauce",
          "cheese",
          "pepperoni",
          "green peppers",
          "mushrooms",
          "olives"
        )
      )
      .messages({
        "array.base": "Please choose between 2 and 4 toppings.",
        "array.min": "Please choose between 2 and 4 toppings.",
        "array.max": "Please choose no more than 4 toppings.",
        "any.required": "Please choose between 2 and 4 toppings.",
        "any.custom": "Please only choose from the provided toppings.",
      }),
    name: Joi.string().trim().min(2).max(20).empty("").required().messages({
      "string.min": "Not enough characters in your name!",
      "string.max": "Please, no more than 20 characters in your name!",
      "any.required": "Your name is required!",
    }),
    email: Joi.string().trim().email().empty("").required().messages({
      "string.email": "Must be a valid email address.",
      "any.required": "Please enter an email address.",
    }),
    rewardsId: Joi.number().integer().min(1).max(9999).messages({
      "number.base": "The ID must be a number!",
      "number.min": "The ID must be a number between 1 and 9999!",
      "number.max": "The ID must be a number between 1 and 9999!",
    }),
  }),
  color: Joi.object({
    color: Joi.string().length(7).empty("").required().failover("#5555aa"),
  })
}; 

module.exports = schemas;