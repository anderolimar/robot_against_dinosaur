
function validateRobotElement(spaceId, element){
  let errors = validateElement(spaceId, element);
  
  if(!element.face || !["right", "left", "top", "bottom"].includes(element.face)){
    errors.push({ 
      code: "INVALID_FACE_VALUE", 
      message: "Invalid face value. Values allowed ['right', 'left', 'top', 'bottom']."  
    })    
  }
  return errors;
}  

function validateElement(spaceId, element){
  let errors = validateSpaceId(spaceId);
  
  if(!element.row || isNaN(element.row) || !Number.isInteger(Number(element.row))){
    errors.push({ 
      code: "INVALID_ROW_VALUE", 
      message: "Invalid row value. Value must be a Integer" 
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

function validateRobotId(spaceId, robotId){
  let errors = validateSpaceId(spaceId);
  
  if(!robotId || isNaN(robotId) || !Number.isInteger(Number(robotId))){
    errors.push({ 
      code: "INVALID_ROBOT_ID_VALUE", 
      message: "Invalid robot id value. Value must be a Integer" 
    })    
  }  
  
  return errors;
}

function validateSpaceId(spaceId){
  let errors = [];
  
  if(!spaceId || isNaN(spaceId) || !Number.isInteger(Number(spaceId))){
    errors.push({ 
      code: "INVALID_SPACE_ID_VALUE", 
      message: "Invalid spaceId value. Value must be a Integer" 
    })    
  }  
 
   return errors;
}

function validateRobotMovement(newRow, newColumn, direction){
  let errors = [];
  const invalidRow = (newRow < 1 || parseInt(newRow) > 50);
  const invalidColumn = (newColumn < 1 || parseInt(newColumn) > 50);

  if(invalidColumn || invalidColumn){
    errors.push({ 
      code: "INVALID_ROBOT_MOVEMENT", 
      message: `Invalid robot movement. Robot can't ${direction}, because of space limit.` 
    }) 
  }   
  return errors;
}

module.exports = {
    validateRobotElement,
    validateElement,
    validateRobotId,
    validateSpaceId,
    validateRobotMovement
};