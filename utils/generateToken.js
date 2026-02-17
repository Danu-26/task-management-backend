const jwt =require('jsonwebtoken');
require('dotenv').config();

exports.generateAccessToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: process.env.ACCESS_TOKEN_EXPIRY});
}
