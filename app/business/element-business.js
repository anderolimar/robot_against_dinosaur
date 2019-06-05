const models = require('../models');
const SpaceRepository = require('../data').space;
const ElementRepository = require('../data').element;
const Element = models.data.element;
const SuccessResponse = models.responses.commons.SuccessResponse;
const BadGatewayResponse = models.responses.commons.BadGatewayResponse;
const ValidationResponse = models.responses.commons.ValidationResponse;
const SpaceNotFoundResponse = models.responses.space.SpaceNotFoundResponse;
const DatabaseError = models.errors.database.DatabaseError;

class ElementBusiness {
  static async createNewRobot(spaceId, element){
    const validation = validateRobotElement(element);
    if(validation.length) return new ValidationResponse(validation);
    return createNewElement(spaceId, element, Element.Types.ROBOT);
  }
  
  static async createNewDinosaur(spaceId, element){
    const validation = validateElement(element);
    if(validation.length) return new ValidationResponse(validation);
    return createNewElement(spaceId, element, Element.Types.DINOSAUR);
  }  
}

async function createNewElement(spaceId, element, type){
  try{
    const space = await SpaceRepository.getSpace(spaceId);
    if(!space) return new SpaceNotFoundResponse(spaceId);
    
    let params = Object.assign({ type: type, spaceId: spaceId }, element);
    let newElement = new Element(params);
    let savedElement = await ElementRepository.createNewElement(newElement);
    return new SuccessResponse(savedElement);
  }
  catch(err){
    if(err instanceof DatabaseError){
      return new BadGatewayResponse();
    }
    throw err;
  }
}  

function validateRobotElement(element){
  let errors = validateElement(element);
  
  if(!element.face || !["right", "left", "top", "bottom"].includes(element.face)){
    errors.push({ 
      code: "INVALID_FACE_VALUE", 
      message: "Invalid face value. Values allowed ['right', 'left', 'top', 'bottom']."  
    })    
  }
  return errors;
}  

function validateElement(element){
  let errors = [];
  
  if(!element.line || isNaN(element.line) || !Number.isInteger(Number(element.line))){
    errors.push({ 
      code: "INVALID_LINE_VALUE", 
      message: "Invalid line value. Value must be a Integer" 
    })    
  }
  
  if(!element.column || isNaN(element.column) || !Number.isInteger(Number(element.column))){
    errors.push({ 
      code: "INVALID_COLUMN_VALUE", 
      message: "Invalid column value. Value must be a Integer"  
    })    
  }

  return errors;
}

module.exports = ElementBusiness;