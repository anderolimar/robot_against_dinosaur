class RobotNotFoundResponse {
  constructor(robotId){
    this.status = 404;
    this.content = {
      code: "ROBOT_NOT_FOUND",
      message: `Robot with id (${robotId}) not found.`
    }
  }
}

module.exports = {
  RobotNotFoundResponse
}