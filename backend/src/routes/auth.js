const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { validateSignup, validateSignin } = require('../middleware/validation');
const authMiddleware = require('../middleware/auth');

// @route   POST /api/auth/signup
// @desc    Register a new user
// @access  Public
router.post('/signup', validateSignup, authController.signup);

// @route   POST /api/auth/signin
// @desc    Login user
// @access  Public
router.post('/signin', validateSignin, authController.signin);

// @route   POST /api/auth/signout
// @desc    Logout user
// @access  Private
router.post('/signout', authMiddleware, authController.signout);

// @route   POST /api/auth/forgot-password
// @desc    Send password reset email
// @access  Public
router.post('/forgot-password', authController.forgotPassword);

// @route   POST /api/auth/reset-password
// @desc    Reset password with token
// @access  Public
router.post('/reset-password', authController.resetPassword);

// @route   GET /api/auth/verify-token
// @desc    Verify JWT token
// @access  Private
router.get('/verify-token', authMiddleware, authController.verifyToken);

// @route   POST /api/auth/refresh-token
// @desc    Refresh JWT token
// @access  Private
router.post('/refresh-token', authMiddleware, authController.refreshToken);

module.exports = router;
