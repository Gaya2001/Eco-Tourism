const errorHandler = (err, req, res, next) => {
  console.error('Error Stack:', err.stack);

  let error = { ...err };
  error.message = err.message;

  // Firebase errors
  if (err.code) {
    switch (err.code) {
      case 'auth/user-not-found':
        error.message = 'User not found';
        error.statusCode = 404;
        break;
      case 'auth/wrong-password':
        error.message = 'Invalid credentials';
        error.statusCode = 401;
        break;
      case 'auth/email-already-in-use':
        error.message = 'Email already in use';
        error.statusCode = 400;
        break;
      case 'auth/weak-password':
        error.message = 'Password is too weak';
        error.statusCode = 400;
        break;
      case 'auth/invalid-email':
        error.message = 'Invalid email format';
        error.statusCode = 400;
        break;
      case 'permission-denied':
        error.message = 'Permission denied';
        error.statusCode = 403;
        break;
      default:
        error.message = 'Authentication error';
        error.statusCode = 400;
    }
  }

  // Validation errors
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message);
    error.message = message;
    error.statusCode = 400;
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    error.message = 'Invalid token';
    error.statusCode = 401;
  }

  if (err.name === 'TokenExpiredError') {
    error.message = 'Token expired';
    error.statusCode = 401;
  }

  // Duplicate key error
  if (err.code === 11000) {
    const message = 'Duplicate field value entered';
    error.message = message;
    error.statusCode = 400;
  }

  // Cast error
  if (err.name === 'CastError') {
    error.message = 'Resource not found';
    error.statusCode = 404;
  }

  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || 'Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

module.exports = errorHandler;
