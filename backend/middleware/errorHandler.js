// Centralized error handler. Any controller that calls next(err) lands here.
// Must be registered as the LAST app.use() in server.js.
const errorHandler = (err, req, res, next) => {
  console.error(err);

  let statusCode = err.statusCode || 500;
  let message = err.message || 'Server Error';

  // Mongoose bad ObjectId (e.g. /api/v1/jobs/not-a-valid-id)
  if (err.name === 'CastError') {
    statusCode = 404;
    message = 'Resource not found';
  }

  // Mongoose duplicate key error (unique index violation)
  if (err.code === 11000) {
    statusCode = 400;
    const field = Object.keys(err.keyPattern || {})[0];
    message = field ? `Duplicate value for field: ${field}` : 'Duplicate field value entered';
  }

  // Mongoose schema validation error
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((val) => val.message)
      .join(', ');
  }

  res.status(statusCode).json({ success: false, message });
};

module.exports = errorHandler;
