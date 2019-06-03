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

module.exports = {
  SuccessResponse,
  BadGatewayResponse
}