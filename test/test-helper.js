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
    
    static sleep(ms){
      return new Promise(resolve=>{
          setTimeout(resolve,ms)
      })
    }

    static compareArray(arr1, arr2){
      if(arr1.length != arr2.length) return false;
      return arr1.reduce((eq, v) => eq && arr2.includes(v), true);
    }

    static server(){
        server.init(app);
        return server;        
    }
}

module.exports = TestsHelper;