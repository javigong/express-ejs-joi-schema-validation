// Combine two validator middlewares from validator.js into a single function called validators: 

const validators = (schemaType, location) => {
  return (req, res, next) => {
    // Validate with the proper schema and store all possible errors using abortEarly: false
    const { error } = schemaType.validate(req[location], {
      abortEarly: false,
    });
    // If no errors, go to next middleware
    if (error === undefined) {
      next();
    // If there are errors, res status 422 as understood but unable to process, and render error.ejs passing error details info.
    } else {
      res.status(422).render("error", { details: error.details });
    }
  };
};

module.exports = validators;
