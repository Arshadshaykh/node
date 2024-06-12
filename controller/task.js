const catchAsync = require('../helpers/asyncHandler')
const ErrorResponse = require('../helpers/errorResponse')
const Task = require('../models/task')


const createTask = catchAsync(async (req, res) => {
    let body = req.body;
    let code;
    let tasks = await Task.create(body);

    code = 200;
    res.status(code).json({ success: true, message: 'Task created', count: tasks.length, data: tasks })

})

const getTasks = catchAsync(async (req, res) => {
    let tasks = await Task.find();
    let code;

    if (tasks) {
        code = 200;
        res.status(code).json({ success: true, message: 'success', count: tasks.length, data: tasks })
    }
    else {
        code = 400
        res.status(code).json({ success: false, message: 'No tasks found', count: tasks.length, data: tasks })
    }

})

const updateTask = catchAsync(async (req, res) => {
    let id = req.params.id;

    let code;

    let task = await Task.findByIdAndUpdate(id, req.body,{new: true});
    if (task) {
        code = 200
        res.status(code).json({ success: true, message: 'Task Updated',data:task })
    }
    else {
        code = 400
        res.status(code).json({ success: false, message: 'No tasks found' })

    }
})
const deleteTask = catchAsync(async (req, res) => {
    let id = req.params.id;
    let task = await Task.findByIdAndDelete(id)
    let code;

    if (task) {
        code = 200
        res.status(code).json({ success: true, message: 'Task deleted' })
    }
    else {
        code = 400
        res.status(code).json({ success: false, message: 'No tasks found' })

    }
})

module.exports = { getTasks, deleteTask, createTask, updateTask }