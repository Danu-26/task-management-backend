const express = require('express');
const router = express.Router();

const authRoutes = require('./auth/authRoutes');
const taskRoutes = require('./task/taskRoutes');

router.use('/auth', authRoutes);
router.use('/task', taskRoutes);

module.exports = router;
