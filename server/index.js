var express = require('express');
var handler = express();
var router = express.Router();
var port = parseInt(process.env.APP_PORT || '3000');

class Server {
    start(app){
        app.start(router); 
        
        handler.use(router);

        handler.listen(port, function () {
          console.log(`Listening on port ${port}!`);
        });        
    }
}

module.exports = new Server();