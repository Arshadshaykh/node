const express = require('express');
const {
    getNames,updateName,insertname,deleteName
} = require('../controller/admin');
const router = express.Router();


router.route('/names').get(getNames).post(insertname);
router.route('/name/:id').put(updateName).delete(deleteName);
// router.get('/names', getNames);
// router.post('/names', insertname);
// router.put('/name/:id', updateName);
// router.delete('/name/:id', deleteName);


module.exports = router;