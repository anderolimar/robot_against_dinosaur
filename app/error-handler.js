function notFoundHandler(req, res, next){
  res.status(404).json({ message: "NOT FOUND" });
}

function internalErrorHandler(err, req, res, next){
  console.log(`internalErrorHandler : ${err}`);
  res.status(500).json({ message: "INTERNAL SERVER ERRROR" });
}

module.exports = {
  internalErrorHandler,
  notFoundHandler
}