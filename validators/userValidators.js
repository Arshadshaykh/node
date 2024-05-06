const {body,check}=require("express-validator");
const prepareValidationError = require("../helpers/validationError");

const validateRegiterUser = [
    
    check("name", "name field is missing").exists(),
    check("email", "email field is missing").exists(),
    check("email", "Enter valid email").isEmail(),
    check("password", "password field is missing").exists(),
    check("passwordConfirm", "confirm password field is missing").exists(),
    (req, res, next) => {
      prepareValidationError(req, res, next);
    },
  ]
const validateLoginUser = [
    
    check("email", "email field is missing").exists(),
    check("email", "Enter valid email").isEmail(),
    check("password", "password field is missing").exists(),
    (req, res, next) => {
      prepareValidationError(req, res, next);
    },
  ]
module.exports={validateRegiterUser,validateLoginUser};