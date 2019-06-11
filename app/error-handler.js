const logger = require('./logger')

function notFoundHandler(_req, res, _next){
  res.status(404).json({ message: "NOT FOUND" });
}

function internalErrorHandler(err, _req, res, _next){
  logger.error(err);
  res.status(500).json({ message: "INTERNAL SERVER ERRROR" });
}

module.exports = {
  internalErrorHandler,
  notFoundHandler
}