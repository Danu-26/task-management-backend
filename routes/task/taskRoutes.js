const express = require('express');
const router = express.Router();
const {createTask,getAllTasks,updateTask,removeTask,getTaskStats} = require('../../controller/task/taskController');
const {checkAccessAuthenticateToken}=require('../../middlewares/authMiddleware')
const {createTaskSchema,getTaskSchema,updateTaskSchema}=require("../../schema/validationSchema")
const {validatePayload}=require("../../validator/validatePayload");

router.post('/create-task',checkAccessAuthenticateToken,validatePayload(createTaskSchema), createTask);
router.post('/get-all-task',checkAccessAuthenticateToken,validatePayload(getTaskSchema), getAllTasks);
router.put('/update-task/:id',checkAccessAuthenticateToken,validatePayload(updateTaskSchema), updateTask);
router.delete('/remove-task/:id', checkAccessAuthenticateToken, removeTask);
router.get('/get-task-stats', checkAccessAuthenticateToken, getTaskStats);

module.exports = router;
