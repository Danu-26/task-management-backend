const { Task,User } = require('../../models/index');
const {handleServiceError} = require("../../utils/handleServiceError");
const {CustomError} =require('../../utils/CustomError');
const { Op } = require('sequelize');

exports.createTask = async (data) => {
    try {

        const user = await User.findByPk(data.user_id);
        if (!user) {
            throw new CustomError('User not found', 404);
        }

        const task = await Task.create(data);

        return {
            success:true,
            message:"Successfully added task",
            data:task
        };

    } catch (error) {
        throw handleServiceError(error, 'Error in createTask');
    }
};

exports.getAllTasks = async ({ userId, page = 1, limit = 10, status, priority, search }) => {
    try {
        const offset = (page - 1) * limit;

        // where clause
        const whereClause = {
            user_id: userId
        };

        if (status) whereClause.status = status;
        if (priority) whereClause.priority = priority;

        if (search) {
            whereClause.title = {
                [Op.iLike]: `%${search}%`
            };
        }

        const tasks = await Task.findAndCountAll({
            where: whereClause,
            limit: Number(limit),
            offset: Number(offset),
            order: [['created_at', 'ASC']]
        });

        return {
            success: true,
            message: 'Tasks fetched successfully',
            data: tasks.rows,
            total: tasks.count,
            page: Number(page),
            limit: Number(limit)
        };
    } catch (error) {
        throw handleServiceError(error, 'Error in getAllTasks');
    }
};