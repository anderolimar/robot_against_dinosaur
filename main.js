/*global __require*/

require('./requires');

var app = __require("app");

var server = __require("server")

server.init(app);

server.start();