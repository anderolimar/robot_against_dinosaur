const ElementBusiness = require('../business').element;

class RobotController {
  static async newRobot(req, res, next) {
    try{
      const { spaceId } = req.params;
      const { row, column, face } = req.body;
      const result = await ElementBusiness.createNewRobot(spaceId, { row, column, face });
      res.status(result.status).json(result.content);
    }
    catch(err){
      next(err);
    }
  }

  static async turnLeftRobot(req, res, next) {
    try{
      const { spaceId, robotId } = req.params;
      const result = await ElementBusiness.turnRobot(spaceId, robotId, "left");
      res.status(result.status).json(result.content);
    }
    catch(err){
      next(err);
    }
  }  

  static async turnRightRobot(req, res, next) {
    try{
      const { spaceId, robotId } = req.params;
      const result = await ElementBusiness.turnRobot(spaceId, robotId, "right");
      res.status(result.status).json(result.content);
    }
    catch(err){
      next(err);
    }
  }   

  static async moveForwardRobot(req, res, next) {
    try{
      const { spaceId, robotId } = req.params;
      const result = await ElementBusiness.moveRobot(spaceId, robotId, "forward");
      res.status(result.status).json(result.content);
    }
    catch(err){
      next(err);
    }
  }  

  static async moveBackwardRobot(req, res, next) {
    try{
      const { spaceId, robotId } = req.params;
      const result = await ElementBusiness.moveRobot(spaceId, robotId, "backward");
      res.status(result.status).json(result.content);
    }
    catch(err){
      next(err);
    }
  } 

  static async robotAttack(req, res, next) {
    try{
      const { spaceId, robotId } = req.params;
      const result = await ElementBusiness.robotAttack(spaceId, robotId);
      res.status(result.status).json(result.content);
    }
    catch(err){
      next(err);
    }
  } 

}

module.exports = RobotController;