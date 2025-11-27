const mongoose = require('mongoose');

/**
 * Check if MongoDB is connected
 * @returns {boolean}
 */
const isDBConnected = () => {
  return mongoose.connection.readyState === 1;
};

/**
 * Middleware to check database connection before handling requests
 */
const checkDBConnection = (req, res, next) => {
  if (!isDBConnected()) {
    return res.status(503).json({
      success: false,
      message: 'Database is not connected. Please check your MongoDB Atlas connection and IP whitelist.',
      error: 'Database connection required'
    });
  }
  next();
};

module.exports = {
  isDBConnected,
  checkDBConnection
};

