const bcrypt = require('bcryptjs');
const { User } = require('../../models/index');
const { generateAccessToken } = require('../../utils/generateToken');
const {handleServiceError} = require("../../utils/handleServiceError");
const {CustomError} =require('../../utils/CustomError');

exports.register = async ({name, email, password}) => {
    try {

        //validate the user
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            throw new CustomError('Email already registered', 400);
        }

        //Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        //Create user
        const user = await User.create({
            username:name,
            email,
            password: hashedPassword,
        });

        // Generate JWT
        const token =  await generateAccessToken({
            id: user.id,
            email: user.email
        });

        const response={
            id: user.id,
            name: user.username,
            email: user.email,
        }

       return {
           success:true,
            message: 'User registered successfully',
            data:{
               user:response,
               token
            }
        };
    } catch (error) {
        console.error(error);
        throw handleServiceError(error,'Error in register');
    }
};

exports.login = async ({ email, password}) => {
    try {
        // Find user by email
        const user = await User.findOne({ where: { email } });
        if (!user) {
            throw new CustomError('User not found', 404);
        }

        // 2. Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new CustomError( 'Invalid email or password',400 );
        }

        // 3. Generate token
        const token = await  generateAccessToken({
            id: user.id,
            email: user.email
        });

        const response={
            id: user.id,
            name: user.username,
            email: user.email,
        }
        return {
            success:true,
            message: 'Login successful',
            data: {
                user:response,
                token
            }
        };
    } catch (error) {
        console.error(error);
        throw handleServiceError( error,'Error in login');
    }
};