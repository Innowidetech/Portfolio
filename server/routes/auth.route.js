const express = require('express');
const router = express.Router()
const {registration, login, forgotPassword, resetPassword, logout} = require('../controllers/auth.controller');
const { protect } = require('../utils/auth.middleware');

// router.post('/registration', registration);
router.post('/login', login);
router.post('/forgotPassword', forgotPassword);
router.post('/resetPassword', resetPassword);
router.post('/logout', protect, logout);

module.exports = router