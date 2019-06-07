const ElementBusiness = require('../business').element;

class DinosaurController {
  static async newDinosaur(req, res, next) {
    try{
      const { spaceId } = req.params;
      const { line, column } = req.body;
      const result = await ElementBusiness.createNewDinosaur(spaceId, { line, column });
      res.status(result.status).json(result.content);
    }
    catch(err){
      next(err);
    }
  }

}

module.exports = DinosaurController;