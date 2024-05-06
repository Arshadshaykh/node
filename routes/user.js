const express = require('express');
const {protect}=require('../middleware/auth');
const {validateRegiterUser,validateLoginUser}=require('../validators/userValidators');

const {signUp,login,getLogedInUser}=require('../controller/user');
const router = express.Router();

router.route('/signup').post(validateRegiterUser,signUp);
router.route('/login').post(validateLoginUser,login);
router.route('/me').post(protect,getLogedInUser);

module.exports = router;