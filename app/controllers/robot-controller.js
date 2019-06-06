const ElementBusiness = require('../business').element;

class RobotController {
  static async newRobot(req, res, next) {
    try{
      const { spaceId } = req.params;
      const { line, column, face } = req.body;
      const result = await ElementBusiness.createNewRobot(spaceId, { line, column, face });
      res.status(result.status).json(result.content);
    }
    catch(err){
      next(err);
    }
  }

}

module.exports = RobotController;