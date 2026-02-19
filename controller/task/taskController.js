const taskService = require('../../services/task/taskService');

exports.createTask = async (req, res,next) => {
    try {
        const result = await taskService.createTask(req.body);
        return res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}

exports.getAllTasks = async (req, res,next) => {
    try {
        const userId = req.user?.id;
        const {page,limit, status, priority, search}=req.body;

        const result = await taskService.getAllTasks({userId,page , limit, status, priority, search});
        return res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}