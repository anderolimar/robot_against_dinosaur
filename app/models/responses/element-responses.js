class RobotNotFoundResponse {
  constructor(robotId){
    this.status = 404;
    this.content = {
      code: "ROBOT_NOT_FOUND",
      message: `Robot with id (${robotId}) not found.`
    }
  }
}

class AlreadyFilledPositionResponse {
  constructor(position){
    this.status = 409;
    this.content = {
      code: "ALREADY_FILLED_POSITION",
      message: `Already filled position (${JSON.stringify(position)}).`
    }
  }
}

class OutOfSpaceRangeResponse {
  constructor(position){
    this.status = 400;
    this.content = {
      code: "OUT_OF_SPACE_RANGE",
      message: `Row (${position.row}) or Column (${position.row}) out of space range [1-50].`
    }
  }
}

module.exports = {
  RobotNotFoundResponse,
  AlreadyFilledPositionResponse,
  OutOfSpaceRangeResponse
}