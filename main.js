const app = require('./app');
const server = require('./server');

server.init(app);

server.start();