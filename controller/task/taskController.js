const taskService = require('../../services/task/taskService');

exports.createTask = async (req, res,next) => {
    try {
        const result = await taskService.createTask(req.body);
        return res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}