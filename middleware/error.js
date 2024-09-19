const ErrorResponse = require('../utils/errorResponse.js');

function errorHandler(err, req, res, next) {
  let error = { ...err };

  error.message = err.message;

  // Mongoose bad ObjectID
  if(err.name === 'CastError') {
    const message = 'Resource not found with id ' + error.value;
    error = new ErrorResponse(message, 404);
  };

  // Mongoose duplicate key
  if(err.code === 11000) {
    const message = 'Duplicate field value entered';
    error = new ErrorResponse(message, 400);
  };

  // Mongoose validation error
  if(err.name === 'ValidationError') {
    let message = [];

    for(let i = 0; i < Object.values(err.errors).length; i++) {
      message = message + Object.values(err.errors)[i].message + ' ';
    };

    error = new ErrorResponse(message, 400);
  };

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error',
  });
};

module.exports = errorHandler;