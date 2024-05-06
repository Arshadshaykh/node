const express = require('express');
const {validateCreateOrder} = require('../validators/bootcamp');
const {
    getNames,updateName,insertname,deleteName,getName
} = require('../controller/adminController');
const {protect}=require('../middleware/auth');
const router = express.Router();


router.route('/names').get(getNames).post(validateCreateOrder,protect,insertname);
router.route('/name/:id').get(getName).put(protect,updateName).delete(protect,deleteName);


module.exports = router;