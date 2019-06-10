const models = require('../models');
const SpaceRepository = require('../data').space;
const Space = models.data.space;
const SuccessResponse = models.responses.commons.SuccessResponse;
const BadGatewayResponse = models.responses.commons.BadGatewayResponse;
const SpaceNotFoundResponse = models.responses.space.SpaceNotFoundResponse;
const ValidationResponse = models.responses.commons.ValidationResponse;
const DatabaseError = models.errors.database.DatabaseError;

class SpaceBusiness {
  static async createNewSpace(){
    try{
      const newSpace = new Space();
      const savedSpace = await SpaceRepository.createNewSpace(newSpace);
      return new SuccessResponse(savedSpace);
    }
    catch(err){
      if(err instanceof DatabaseError){
        return new BadGatewayResponse();
      }
      throw err;
    }
  }

  static async getSpace(spaceId){
    try {
      const validation = SpaceBusiness.validateSpaceId(spaceId);
      if(validation.length) return new ValidationResponse(validation);
    
      const space = await SpaceRepository.getSpace(spaceId);
      if(!space) {
        return new SpaceNotFoundResponse(spaceId);
      }
      return new SuccessResponse(space);
    }
    catch(err){
      if(err instanceof DatabaseError){
        return new BadGatewayResponse();
      }
      throw err;
    }
  }
  
  static validateSpaceId(spaceId){
    let errors = [];
    
    if(!spaceId || isNaN(spaceId) || !Number.isInteger(Number(spaceId))){
      errors.push({ 
        code: "INVALID_SPACE_ID_VALUE", 
        message: "Invalid spaceId value. Value must be a Integer" 
      })    
    }
    
    return errors;
  }  
}

module.exports = SpaceBusiness;