export const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  const isDev = process.env.NODE_ENV === 'development';

  if (err.name === 'ValidationError') {
    return res.status(400).json({
      message: 'Validation error',
      errors: Object.values(err.errors).map((e) => e.message),
    });
  }

  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(400).json({ message: `${field} already exists.` });
  }

  res.status(statusCode).json({
    message: err.message || 'Internal Server Error',
    stack: isDev ? err.stack : undefined,
  });
};
