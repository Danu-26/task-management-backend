const express = require('express');
const router = express.Router();
const {createTask} = require('../../controller/task/taskController');
const {checkAccessAuthenticateToken}=require('../../middlewares/authMiddleware')
const {createTaskSchema}=require("../../schema/validationSchema")
const {validatePayload}=require("../../validator/validatePayload");

router.post('/create-task',checkAccessAuthenticateToken,validatePayload(createTaskSchema), createTask);

module.exports = router;
