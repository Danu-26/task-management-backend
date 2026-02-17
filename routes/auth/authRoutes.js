const express = require('express');
const { register, login } = require('../../controller/auth/authController');
const router = express.Router();
const {userSignupSchema,userLoginSchema}=require("../../schema/validationSchema")
const {validatePayload}=require("../../validator/validatePayload")

router.post('/register',validatePayload(userSignupSchema), register);
router.post('/login',validatePayload(userLoginSchema), login);

module.exports = router;
