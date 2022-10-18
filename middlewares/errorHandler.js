const errorHandler = (error, req, res, next) => {
  const statusCode = res.statusCode ? statusCode : 500;
  const stack = proces.env.NODE_ENV === production ? null : error.stack;

  res.status(statusCode);
  res.json({ message: error.message, stack });
};

module.exports = errorHandler;
