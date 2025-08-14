// Error handling middleware

const notFound = (req, res, next) => {
  const err = new Error(`Route Not Found - ${req.originalUrl}`);
  err.status = 404;
  next(err);
};

// Error handler
const errorHandler = (err, req, res, next) => {
  // Log error
  console.error('Error occurred:', {
    message: err.message,
    status: err.status || 500,
    url: req.originalUrl,
    method: req.method,
    timestamp: new Date().toISOString(),
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });

  // Determine status code
  const statusCode = err.status || err.statusCode || 500;
  
  // Prepare error response
  const errorResponse = {
    success: false,
    error: {
      message: err.message || 'Internal Server Error',
      status: statusCode,
      timestamp: new Date().toISOString()
    }
  };

  // Only include stack trace in development
  if (process.env.NODE_ENV === 'development') {
    errorResponse.error.stack = err.stack;
  }

  // Send error response
  res.status(statusCode).json(errorResponse);
};

// Request logger middleware
const logger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`${timestamp} - ${req.method} ${req.originalUrl} - IP: ${req.ip}`);
  next();
};

module.exports = { 
  errorHandler, 
  notFound, 
  logger 
};