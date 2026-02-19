const express = require('express');
const router = express.Router();
const {createTask,getAllTasks} = require('../../controller/task/taskController');
const {checkAccessAuthenticateToken}=require('../../middlewares/authMiddleware')
const {createTaskSchema,getTaskSchema}=require("../../schema/validationSchema")
const {validatePayload}=require("../../validator/validatePayload");

router.post('/create-task',checkAccessAuthenticateToken,validatePayload(createTaskSchema), createTask);
router.post('/get-all-task',checkAccessAuthenticateToken,validatePayload(getTaskSchema), getAllTasks);

module.exports = router;
