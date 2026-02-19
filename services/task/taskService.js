const { Task,User } = require('../../models/index');
const {handleServiceError} = require("../../utils/handleServiceError");
const {CustomError} =require('../../utils/CustomError');


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
