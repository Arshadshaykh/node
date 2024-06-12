const express = require('express');
const router = express.Router();
const { getTasks, deleteTask, createTask,updateTask } = require('../controller/task')

router.route('/addNew').post(createTask)
router.route('/getTasks').get(getTasks)
router.route('/deleteTask/:id').delete(deleteTask)
router.route('/updateTask/:id').put(updateTask)

module.exports = router;
