const ElementBusiness = require('../business').element;

class DinosaurController {
  static async newDinosaur(req, res, next) {
    try{
      const { spaceId } = req.params;
      const { row, column } = req.body;
      const result = await ElementBusiness.createNewDinosaur(spaceId, { row, column });
      res.status(result.status).json(result.content);
    }
    catch(err){
      next(err);
    }
  }

}

module.exports = DinosaurController;