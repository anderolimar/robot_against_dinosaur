const SpaceBusiness = require('../business').space;

class SpacesController {
  static async newSpace(req, res, next) {
    try{
      let result = await SpaceBusiness.createNewSpace()
      res.status(result.status).json(result.content);
    }
    catch(err){
      next(err);
    }
  }

  static async getSpace(req, res, next) {
    try{
      let spaceId = req.params.id;
      let result = await SpaceBusiness.getSpace(spaceId);
      res.status(result.status).json(result.content);
    }
    catch(err){
      next(err);
    }
  }  
}

module.exports = SpacesController;