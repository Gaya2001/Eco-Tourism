const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/auth');
const { validateUpdateProfile } = require('../middleware/validation');

// @route   GET /api/users/profile
// @desc    Get user profile
// @access  Private
router.get('/profile', authMiddleware, userController.getProfile);

// @route   PUT /api/users/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', authMiddleware, validateUpdateProfile, userController.updateProfile);

// @route   GET /api/users/:id
// @desc    Get user by ID (public info only)
// @access  Public
router.get('/:id', userController.getUserById);

module.exports = router;
