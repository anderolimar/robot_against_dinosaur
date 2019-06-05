class SuccessResponse {
  constructor(result){
    this.status = 200;
    this.content = result;
  }
}

class BadGatewayResponse {
  constructor(){
    this.status = 502;
    this.content = {
      message: "Bad Gateway"
    }
  }
}

class ValidationResponse {
  constructor(errors){
    this.status = 400;
    this.content = { errors } 
  }
}

module.exports = {
  SuccessResponse,
  BadGatewayResponse,
  ValidationResponse
}