function handle404(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
}

function handleErrors(err, req, res, next) {
  const statusCode = err.status || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({ message });
}

function BadRequestError(message) {
  const error = new Error(message);
  error.status = 400;
  return error;
}

function UnauthorizedError(message) {
  const error = new Error(message);
  error.status = 401;
  return error;
}

function ForbiddenError(message) {
  const error = new Error(message);
  error.status = 403;
  return error;
}

function NotFoundError(message) {
  const error = new Error(message);
  error.status = 404;
  return error;
}

function ConflictError(message) {
  const error = new Error(message);
  error.status = 409;
  return error;
}

module.exports = {
  handle404,
  handleErrors,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
};