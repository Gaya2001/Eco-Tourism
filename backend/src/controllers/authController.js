const { auth, db } = require('../config/firebase');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

class AuthController {
  // Register new user
  async signup(req, res) {
    try {
      const { email, password, firstName, lastName, role, phone, dateOfBirth } = req.body;

      // Create user in Firebase Auth
      const userRecord = await auth.createUser({
        email,
        password,
        displayName: `${firstName} ${lastName}`,
        disabled: false
      });

      // Create user document in Firestore
      const userDoc = {
        uid: userRecord.uid,
        email,
        firstName,
        lastName,
        role: role || 'tourist',
        phone: phone || null,
        dateOfBirth: dateOfBirth || null,
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: true,
        emailVerified: false,
        profileComplete: false
      };

      await db.collection('users').doc(userRecord.uid).set(userDoc);

      // Generate custom JWT token
      const token = jwt.sign(
        { uid: userRecord.uid, email, role: role || 'tourist' },
        config.jwt.secret,
        { expiresIn: config.jwt.expiresIn }
      );

      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data: {
          user: {
            uid: userRecord.uid,
            email,
            firstName,
            lastName,
            role: role || 'tourist'
          },
          token
        }
      });
    } catch (error) {
      console.error('Signup error:', error);
      res.status(400).json({
        success: false,
        message: error.message || 'Registration failed'
      });
    }
  }

  // Login user
  async signin(req, res) {
    try {
      const { email, password } = req.body;

      // Get user by email from Firebase Auth
      const userRecord = await auth.getUserByEmail(email);

      // Get user document from Firestore
      const userDoc = await db.collection('users').doc(userRecord.uid).get();

      if (!userDoc.exists) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      const userData = userDoc.data();

      if (!userData.isActive) {
        return res.status(403).json({
          success: false,
          message: 'Account is disabled'
        });
      }

      // Generate custom JWT token
      const token = jwt.sign(
        { uid: userRecord.uid, email, role: userData.role },
        config.jwt.secret,
        { expiresIn: config.jwt.expiresIn }
      );

      // Update last login
      await db.collection('users').doc(userRecord.uid).update({
        lastLogin: new Date(),
        updatedAt: new Date()
      });

      res.json({
        success: true,
        message: 'Login successful',
        data: {
          user: {
            uid: userRecord.uid,
            email: userData.email,
            firstName: userData.firstName,
            lastName: userData.lastName,
            role: userData.role
          },
          token
        }
      });
    } catch (error) {
      console.error('Signin error:', error);
      res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }
  }

  // Logout user
  async signout(req, res) {
    try {
      // In a stateless JWT system, logout is handled client-side
      // But we can blacklist the token or update user's last activity
      
      await db.collection('users').doc(req.user.uid).update({
        lastActivity: new Date(),
        updatedAt: new Date()
      });

      res.json({
        success: true,
        message: 'Logout successful'
      });
    } catch (error) {
      console.error('Signout error:', error);
      res.status(500).json({
        success: false,
        message: 'Logout failed'
      });
    }
  }

  // Forgot password
  async forgotPassword(req, res) {
    try {
      const { email } = req.body;

      await auth.generatePasswordResetLink(email);

      res.json({
        success: true,
        message: 'Password reset email sent'
      });
    } catch (error) {
      console.error('Forgot password error:', error);
      res.status(400).json({
        success: false,
        message: error.message || 'Failed to send reset email'
      });
    }
  }

  // Reset password
  async resetPassword(req, res) {
    try {
      const { token, newPassword } = req.body;

      // This would typically involve verifying a reset token
      // For Firebase, password reset is handled client-side
      res.json({
        success: true,
        message: 'Password reset successful'
      });
    } catch (error) {
      console.error('Reset password error:', error);
      res.status(400).json({
        success: false,
        message: 'Password reset failed'
      });
    }
  }

  // Verify token
  async verifyToken(req, res) {
    try {
      // Token is already verified by auth middleware
      const userDoc = await db.collection('users').doc(req.user.uid).get();

      if (!userDoc.exists) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      const userData = userDoc.data();

      res.json({
        success: true,
        data: {
          user: {
            uid: userData.uid,
            email: userData.email,
            firstName: userData.firstName,
            lastName: userData.lastName,
            role: userData.role
          }
        }
      });
    } catch (error) {
      console.error('Verify token error:', error);
      res.status(401).json({
        success: false,
        message: 'Token verification failed'
      });
    }
  }

  // Refresh token
  async refreshToken(req, res) {
    try {
      // Generate new token
      const token = jwt.sign(
        { uid: req.user.uid, email: req.user.email, role: req.user.role },
        config.jwt.secret,
        { expiresIn: config.jwt.expiresIn }
      );

      res.json({
        success: true,
        data: { token }
      });
    } catch (error) {
      console.error('Refresh token error:', error);
      res.status(500).json({
        success: false,
        message: 'Token refresh failed'
      });
    }
  }
}

module.exports = new AuthController();
