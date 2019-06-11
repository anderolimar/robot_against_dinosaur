const bunyan = require('bunyan');
const logger = bunyan.createLogger({
  name: 'robots-against-dinosaurs',
  streams: [
    {
      level: 'info',
      stream: process.stdout            
    }
  ]
});

module.exports = logger;