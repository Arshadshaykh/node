const {body,check}=require("express-validator");
const prepareValidationError = require("../helpers/validationError");
const Bootcamp = require('../models/Bootcamps')

// const isEmailInUse = async (value) => {
//   const existingUser = await Bootcamp.findOne({ name: value });
//   return !existingUser; // Negate to return true if email doesn't exist
// };
const validateCreateOrder = [
    
    check("name", "name field is missing").exists(),
    check("description", "description field is missing").exists(),
    check("email", "email field is missing").exists(),
    check("phone", "phone field is missing").exists(),
    (req, res, next) => {
      prepareValidationError(req, res, next);
    },
  ]

  // const validateRegiterUser = [
    
  //   check("name", "name field is missing").exists(),
  //   check("email", "email field is missing").exists(),
  //   check("password", "password field is missing").exists(),
  //   check("passwordConfirm", "confirm password field is missing").exists(),
  //   (req, res, next) => {
  //     prepareValidationError(req, res, next);
  //   },
  // ]

  module.exports={validateCreateOrder}