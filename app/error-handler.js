function errorHandler(err, req, res, next){
  res.status(500).json({ message: "INTERNAL SERVER ERRROR" });
}

module.exports = {
  handler: errorHandler
}