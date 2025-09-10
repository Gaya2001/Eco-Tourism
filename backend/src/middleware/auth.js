const { auth } = require('../config/firebase');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: 'No authorization header provided'
      });
    }

    const token = authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token provided'
      });
    }

    // Verify Firebase token
    try {
      const decodedToken = await auth.verifyIdToken(token);
      req.user = {
        uid: decodedToken.uid,
        email: decodedToken.email,
        emailVerified: decodedToken.email_verified,
        ...decodedToken
      };
      next();
    } catch (firebaseError) {
      // If Firebase token verification fails, try JWT
      try {
        const decoded = jwt.verify(token, config.jwt.secret);
        req.user = decoded;
        next();
      } catch (jwtError) {
        return res.status(401).json({
          success: false,
          message: 'Invalid token'
        });
      }
    }
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(500).json({
      success: false,
      message: 'Authentication error'
    });
  }
};

module.exports = authMiddleware;
