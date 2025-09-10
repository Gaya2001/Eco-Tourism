const { db } = require('../config/firebase');

class UserController {
  // Get user profile
  async getProfile(req, res) {
    try {
      const userDoc = await db.collection('users').doc(req.user.uid).get();

      if (!userDoc.exists) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      const userData = userDoc.data();
      
      // Remove sensitive data
      delete userData.password;

      res.json({
        success: true,
        data: { user: userData }
      });
    } catch (error) {
      console.error('Get profile error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get profile'
      });
    }
  }

  // Update user profile
  async updateProfile(req, res) {
    try {
      const updates = {
        ...req.body,
        updatedAt: new Date()
      };

      await db.collection('users').doc(req.user.uid).update(updates);

      // Get updated user data
      const updatedDoc = await db.collection('users').doc(req.user.uid).get();
      const userData = updatedDoc.data();

      res.json({
        success: true,
        message: 'Profile updated successfully',
        data: { user: userData }
      });
    } catch (error) {
      console.error('Update profile error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to update profile'
      });
    }
  }

  // Get user by ID (public info only)
  async getUserById(req, res) {
    try {
      const { id } = req.params;
      
      const userDoc = await db.collection('users').doc(id).get();

      if (!userDoc.exists) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      const userData = userDoc.data();
      
      // Return only public information
      const publicData = {
        uid: userData.uid,
        firstName: userData.firstName,
        lastName: userData.lastName,
        role: userData.role,
        bio: userData.bio,
        createdAt: userData.createdAt
      };

      res.json({
        success: true,
        data: { user: publicData }
      });
    } catch (error) {
      console.error('Get user by ID error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get user'
      });
    }
  }
}

module.exports = new UserController();

module.exports = new UserController();
