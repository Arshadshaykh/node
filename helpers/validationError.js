const { validationResult } = require("express-validator");
const prepareValidationError = (req, res, next) => {
  const validationObj = validationResult(req);
  if (!validationObj.isEmpty()) {
    const { errors } = validationObj;
    const errMsg = errors.map(errors=>errors.msg);
    const code = 400;
    console.log(`this is the error: ${validationObj}`)
    return res.status(code).json({
      code,
      message: errors.message,
      errors: { errMsg },
    });
  }
  next();
};

module.exports = prepareValidationError;
