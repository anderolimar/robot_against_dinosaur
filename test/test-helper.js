var should = require('should');
const request = require('supertest');
const app = require("../app");
const server = require("../server");

class TestsHelper
{
    static should() {
        return should;
    }
    
    static request() {
        return request;
    }    
    
    static server(){
        server.init(app);
        return server;        
    }
}

module.exports = TestsHelper;