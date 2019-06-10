const models = require('../models');
const SpaceRepository = require('../data').space;
const ElementRepository = require('../data').element;
const validations = require('./validations/element-validations');
const Element = models.data.element;
const SuccessResponse = models.responses.commons.SuccessResponse;
const BadGatewayResponse = models.responses.commons.BadGatewayResponse;
const ValidationResponse = models.responses.commons.ValidationResponse;
const SpaceNotFoundResponse = models.responses.space.SpaceNotFoundResponse;
const RobotNotFoundResponse = models.responses.element.RobotNotFoundResponse;
const AlreadyFilledPositionResponse = models.responses.element.AlreadyFilledPositionResponse;
const OutOfSpaceRangeResponse = models.responses.element.OutOfSpaceRangeResponse; 
const DatabaseError = models.errors.database.DatabaseError;

class ElementBusiness {
  static async createNewRobot(spaceId, element){
    const validation = validations.validateRobotElement(spaceId, element);
    if(validation.length) return new ValidationResponse(validation);

    const {row, column} = element;
    const positionFilled = await hasElementInPosition({row, column})

    if(positionFilled) {
      return new AlreadyFilledPositionResponse({row, column});
    }

    const validPosition = await hasValidPosition({row, column})
    if(!validPosition) {
      return new OutOfSpaceRangeResponse({row, column});
    }       
    
    return createNewElement(spaceId, element, Element.Types.ROBOT);
  }
  
  static async turnRobot(spaceId, robotId, direction){
    const validation = validations.validateRobotId(spaceId, robotId);
    if(validation.length) return new ValidationResponse(validation);
    
    const space = await SpaceRepository.getSpace(spaceId);
    if(!space) return new SpaceNotFoundResponse(spaceId);
    
    const element = await ElementRepository.getElementById(robotId);
    if(!element) return new RobotNotFoundResponse(robotId);  
    
    const newFace = FaceMap[direction][element.face];
    const elementUpdate = { _id: robotId, face: newFace };    

    return updateElement(elementUpdate);
  }  
  
  static async moveRobot(spaceId, robotId, direction){
    const validation = validations.validateRobotId(spaceId, robotId);
    if(validation.length) return new ValidationResponse(validation);
    
    const space = await SpaceRepository.getSpace(spaceId);
    if(!space) return new SpaceNotFoundResponse(spaceId);
    
    const element = await ElementRepository.getElementById(robotId);
    if(!element) return new RobotNotFoundResponse(robotId);    
    
    const moveFunc = MoveFuncMap[direction][element.face];
    const position = moveFunc(element.row, element.column);

    const positionFilled = await hasElementInPosition(position)
    if(positionFilled) {
      return new AlreadyFilledPositionResponse(position);
    }

    const validPosition = await hasValidPosition(position)
    if(!validPosition) {
      return new OutOfSpaceRangeResponse(position);
    }      
    
    const elementUpdate = Object.assign({ _id: robotId }, position);    
    
    return updateElement(elementUpdate);
  }  
  
  static async robotAttack(spaceId, robotId){
    const validation = validations.validateRobotId(spaceId, robotId);
    if(validation.length) return new ValidationResponse(validation);
    
    const space = await SpaceRepository.getSpace(spaceId);
    if(!space) return new SpaceNotFoundResponse(spaceId);
    
    const element = await ElementRepository.getElementById(robotId);
    if(!element) return new RobotNotFoundResponse(robotId);    
    
    return deleteDinosaurs(element);
  } 

  static async createNewDinosaur(spaceId, element){
    const validation = validations.validateElement(spaceId, element);
    if(validation.length) return new ValidationResponse(validation);

    const {row, column} = element;
    const positionFilled = await hasElementInPosition({row, column})
    if(positionFilled) {
      return new AlreadyFilledPositionResponse({row, column});
    }

    const validPosition = await hasValidPosition({row, column})
    if(!validPosition) {
      return new OutOfSpaceRangeResponse({row, column});
    }    

    return createNewElement(spaceId, element, Element.Types.DINOSAUR);
  }  
}

async function createNewElement(spaceId, element, type){
  try{
    const space = await SpaceRepository.getSpace(spaceId);
    if(!space) return new SpaceNotFoundResponse(spaceId);
    
    let params = Object.assign({ type: type, spaceId: space._id }, element);
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

async function updateElement(element){
  try{
    const result = await ElementRepository.updateElement(element._id, element);
    return new SuccessResponse({ success: result });
  }
  catch(err){
    if(err instanceof DatabaseError){
      return new BadGatewayResponse();
    }
    throw err;
  }
}

async function deleteDinosaurs(element){
  try{
    const rows = [ element.row -1, element.row, element.row + 1 ];
    const columns = [ element.column -1, element.column, element.column + 1 ];
    const result = await ElementRepository.deleteElementsByRowsAndColumns(
      rows,
      columns,
      Element.Types.DINOSAUR
    );
    return new SuccessResponse({ success: result });
  }
  catch(err){
    if(err instanceof DatabaseError){
      return new BadGatewayResponse();
    }
    throw err;
  }
}

async function hasElementInPosition(position){
  const element = await ElementRepository.getElementByPosition(position);
  return element != null;
}

async function hasValidPosition(position){
  const validPosition = (
                          parseInt(position.row) >= 1 && 
                          parseInt(position.row) <= 50 &&
                          parseInt(position.column) >= 1 &&
                          parseInt(position.column) <= 50 
                        );
  return validPosition;
}

const FaceMap = {
  left: {
    right: Element.Faces.TOP,  
    left: Element.Faces.BOTTOM,
    top: Element.Faces.LEFT,
    bottom: Element.Faces.RIGHT
  },
  right: {
    right: Element.Faces.BOTTOM,  
    left: Element.Faces.TOP,
    top: Element.Faces.RIGHT,
    bottom: Element.Faces.LEFT
  }  
}

const MoveFuncMap = {
  forward: {
    right: (row, column) => {
      return { row, column: column+1 }
    },  
    left: (row, column) => {
      return { row, column: column-1 }
    }, 
    top: (row, column) => {
      return { row: row-1, column }
    },
    bottom: (row, column) => {
      return { row: row+1, column }
    },
  },
  backward: {
    right: (row, column) => {
      return { row, column: column-1 }
    },  
    left: (row, column) => {
      return { row, column: column+1 }
    }, 
    top: (row, column) => {
      return { row: row+1, column }
    },
    bottom: (row, column) => {
      return { row: row-1, column }
    },
  } 
}

module.exports = ElementBusiness;