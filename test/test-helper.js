/*global __require*/

require('../requires');

var app = __require("app");
var server = __require("server");
var should = require('should');
const request = require('supertest');

class TestsHelper
{
    static should() {
        return should;
    }
    
    static request() {
        return request;
    }    
    
    static server(){
        var server = server();
        server.init(app);
        return server;        
    }
}

module.exports = TestsHelper;