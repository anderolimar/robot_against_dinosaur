/*global __require*/

var express = require('express');
var handler = express();
var router = express.Router();
var port = parseInt(process.env.APP_PORT || '3000');
var Routes = __require("routes");

class App {
    start(router){
        Routes.loadRoutes(router);
    }
}

module.exports = new App();