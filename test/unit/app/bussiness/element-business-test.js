const proxyquire = require("proxyquire");
const testHelper = require("../../../test-helper");
const models = require("../../../../app/models"); 
const Space = models.data.space;
const Element = models.data.element;
const should = testHelper.should();

describe("ElementBusiness", function()
{
  describe('.createNewRobot', function() {
    const spaceId = 123
    let expectedSpace = new Space({_id: spaceId});
  
    it('should create and return a new robot success.', async function() {
      let elementParam = {
        row: 2,
        column: 3,
        face: Element.Faces.LEFT
      }
      let expectedElement = new Element({
        row: 2,
        column: 3,
        face: Element.Faces.LEFT,
        type: Element.Types.ROBOT
      });      

      const ElementBusiness = proxyquire("../../../../app/business/element-business", {
        "../data": {
          space: {
            getSpace: async () => expectedSpace
          },
          element: {
            getElementByPosition: async () => null,
            createNewElement: async () => { 
              expectedElement._id = 456
              return expectedElement
            }
          }
        }
      });
      
      let newRobot = await ElementBusiness.createNewRobot(spaceId, elementParam);
      
      should(newRobot).have.property('status');
      should(newRobot.status).be.equal(200);

      should(newRobot).have.property('content');
      should(newRobot.content).have.property('_id');
      should(newRobot.content).have.property('row');
      should(newRobot.content).have.property('column');
      should(newRobot.content).have.property('face');
      should(newRobot.content).have.property('type');
      should(newRobot.content).have.property('spaceId');
      
      should(newRobot.content._id).be.equal(expectedElement._id);
      should(newRobot.content.row).be.equal(expectedElement.row);
      should(newRobot.content.column).be.equal(expectedElement.column);
      should(newRobot.content.face).be.equal(expectedElement.face);
      should(newRobot.content.type).be.equal(expectedElement.type);
      should(newRobot.content.spaceId).be.equal(expectedElement.spaceId);
    });

    it('should return a error for invalid row value.', async function() {
      let elementParam = {
        row: "a",
        column: 3,
        face: Element.Faces.LEFT
      }
    
      const ElementBusiness = proxyquire("../../../../app/business/element-business", {
        "../data": {
          space: {
            getSpace: async () => expectedSpace
          },
          element: {
            getElementByPosition: async () => null,
            createNewElement: async () => null
          }
        }
      });
      
      let newRobot = await ElementBusiness.createNewRobot(spaceId, elementParam);
      
      should(newRobot).have.property('status');
      should(newRobot.status).be.equal(400);

      should(newRobot).have.property('content');
      should(newRobot.content).have.property('errors');
      
      should(newRobot.content.errors.length).be.equal(1);
      should(newRobot.content.errors[0]).have.property('code');
      should(newRobot.content.errors[0]).have.property('message');
      should(newRobot.content.errors[0].code).be.equals("INVALID_ROW_VALUE");
    });

    it('should return a error for invalid column value.', async function() {
      let elementParam = {
        row: 2,
        column: "c",
        face: Element.Faces.LEFT
      }
    
      const ElementBusiness = proxyquire("../../../../app/business/element-business", {
        "../data": {
          space: {
            getSpace: async () => expectedSpace
          },
          element: {
            getElementByPosition: async () => null,
            createNewElement: async () => null
          }
        }
      });
      
      let newRobot = await ElementBusiness.createNewRobot(spaceId, elementParam);
      
      should(newRobot).have.property('status');
      should(newRobot.status).be.equal(400);

      should(newRobot).have.property('content');
      should(newRobot.content).have.property('errors');
      
      should(newRobot.content.errors.length).be.equal(1);
      should(newRobot.content.errors[0]).have.property('code');
      should(newRobot.content.errors[0]).have.property('message');
      should(newRobot.content.errors[0].code).be.equals("INVALID_COLUMN_VALUE");
    });

    it('should return a error for invalid face value.', async function() {
      let elementParam = {
        row: 2,
        column: 3,
        face: "lef"
      }
    
      const ElementBusiness = proxyquire("../../../../app/business/element-business", {
        "../data": {
          space: {
            getSpace: async () => expectedSpace
          },
          element: {
            getElementByPosition: async () => null,
            createNewElement: async () => null
          }
        }
      });
      
      let newRobot = await ElementBusiness.createNewRobot(spaceId, elementParam);
      
      should(newRobot).have.property('status');
      should(newRobot.status).be.equal(400);

      should(newRobot).have.property('content');
      should(newRobot.content).have.property('errors');
      
      should(newRobot.content.errors.length).be.equal(1);
      should(newRobot.content.errors[0]).have.property('code');
      should(newRobot.content.errors[0]).have.property('message');
      should(newRobot.content.errors[0].code).be.equals("INVALID_FACE_VALUE");
    });
    
    it('should return a error for invalid space.', async function() {
      let invalidSpaceId = 1111111
      let elementParam = {
        row: 2,
        column: 3,
        face: Element.Faces.LEFT
      }
    
      const ElementBusiness = proxyquire("../../../../app/business/element-business", {
        "../data": {
          space: {
            getSpace: async () => null
          },
          element: {
            getElementByPosition: async () => null,
            createNewElement: async () => null
          }
        }
      });
      
      let newRobot = await ElementBusiness.createNewRobot(invalidSpaceId, elementParam);
      
      should(newRobot).have.property('status');
      should(newRobot.status).be.equal(404);

      should(newRobot).have.property('content');
      should(newRobot.content).have.property('code');
      should(newRobot.content).have.property('message');
      should(newRobot.content.code).be.equals("SPACE_NOT_FOUND");
    });    

    it('should return a error for invalid position.', async function() {
      let elementParam = {
        row: 2,
        column: 3,
        face: Element.Faces.LEFT
      }
    
      const ElementBusiness = proxyquire("../../../../app/business/element-business", {
        "../data": {
          space: {
            getSpace: async () => expectedSpace
          },
          element: {
            getElementByPosition: async () => new Element(),
            createNewElement: async () => null
          }
        }
      });
      
      let newRobot = await ElementBusiness.createNewRobot(spaceId, elementParam);
      
      should(newRobot).have.property('status');
      should(newRobot.status).be.equal(409);

      should(newRobot).have.property('content');
      should(newRobot.content).have.property('code');
      should(newRobot.content).have.property('message');
      should(newRobot.content.code).be.equals("ALREADY_FILLED_POSITION");
    });  

  });

  describe('.createNewDinosaur', function() {
    const spaceId = 123
    let expectedSpace = new Space({_id: spaceId});
  
    it('should create and return a new dinosaur success.', async function() {
      let elementParam = {
        row: 2,
        column: 3
      }
      let expectedElement = new Element({
        row: 2,
        column: 3,
        type: Element.Types.DINOSAUR
      });      

      const ElementBusiness = proxyquire("../../../../app/business/element-business", {
        "../data": {
          space: {
            getSpace: async () => expectedSpace
          },
          element: {
            getElementByPosition: async () => null,
            createNewElement: async () => { 
              expectedElement._id = 456
              return expectedElement
            }
          }
        }
      });
      
      const newDinosaur = await ElementBusiness.createNewDinosaur(spaceId, elementParam);
      
      should(newDinosaur).have.property('status');
      should(newDinosaur.status).be.equal(200);

      should(newDinosaur).have.property('content');
      should(newDinosaur.content).have.property('_id');
      should(newDinosaur.content).have.property('row');
      should(newDinosaur.content).have.property('column');
      should(newDinosaur.content).have.property('type');
      should(newDinosaur.content).have.property('spaceId');
      
      should(newDinosaur.content._id).be.equal(expectedElement._id);
      should(newDinosaur.content.row).be.equal(expectedElement.row);
      should(newDinosaur.content.column).be.equal(expectedElement.column);
      should(newDinosaur.content.type).be.equal(expectedElement.type);
      should(newDinosaur.content.spaceId).be.equal(expectedElement.spaceId);
    });

    it('should return a error for invalid row value.', async function() {
      let elementParam = {
        row: "a",
        column: 3
      }
    
      const ElementBusiness = proxyquire("../../../../app/business/element-business", {
        "../data": {
          space: {
            getSpace: async () => expectedSpace
          },
          element: {
            getElementByPosition: async () => null,
            createNewElement: async () => null
          }
        }
      });
      
      const newDinosaur = await ElementBusiness.createNewDinosaur(spaceId, elementParam);
      
      should(newDinosaur).have.property('status');
      should(newDinosaur.status).be.equal(400);

      should(newDinosaur).have.property('content');
      should(newDinosaur.content).have.property('errors');
      
      should(newDinosaur.content.errors.length).be.equal(1);
      should(newDinosaur.content.errors[0]).have.property('code');
      should(newDinosaur.content.errors[0]).have.property('message');
      should(newDinosaur.content.errors[0].code).be.equals("INVALID_ROW_VALUE");
    });

    it('should return a error for invalid column value.', async function() {
      let elementParam = {
        row: 2,
        column: "c"
      }
    
      const ElementBusiness = proxyquire("../../../../app/business/element-business", {
        "../data": {
          space: {
            getSpace: async () => expectedSpace
          },
          element: {
            getElementByPosition: async () => null,
            createNewElement: async () => null
          }
        }
      });
      
      const newDinosaur = await ElementBusiness.createNewDinosaur(spaceId, elementParam);
      
      should(newDinosaur).have.property('status');
      should(newDinosaur.status).be.equal(400);

      should(newDinosaur).have.property('content');
      should(newDinosaur.content).have.property('errors');
      
      should(newDinosaur.content.errors.length).be.equal(1);
      should(newDinosaur.content.errors[0]).have.property('code');
      should(newDinosaur.content.errors[0]).have.property('message');
      should(newDinosaur.content.errors[0].code).be.equals("INVALID_COLUMN_VALUE");
    });

    it('should return a error for invalid space.', async function() {
      let invalidSpaceId = 1111111
      let elementParam = {
        row: 2,
        column: 3,
        face: Element.Faces.LEFT
      }
    
      const ElementBusiness = proxyquire("../../../../app/business/element-business", {
        "../data": {
          space: {
            getSpace: async () => null
          },
          element: {
            getElementByPosition: async () => null,
            createNewElement: async () => null
          }
        }
      });
      
      const newDinosaur = await ElementBusiness.createNewDinosaur(invalidSpaceId, elementParam);
      
      should(newDinosaur).have.property('status');
      should(newDinosaur.status).be.equal(404);

      should(newDinosaur).have.property('content');
      should(newDinosaur.content).have.property('code');
      should(newDinosaur.content).have.property('message');
      should(newDinosaur.content.code).be.equals("SPACE_NOT_FOUND");
    });    

  });  
  
  describe('.turnRobot', function() {
    const spaceId = 123
    const robotId = 555
    const expectedSpace = new Space({_id: spaceId});
  
    it('should turn left and update face from left to bottom.', async function() {
      let elementResult = new Element({
        _id: robotId,
        row: 2,
        column: 3,
        face: 'left',
        type: Element.Types.ROBOT,
        spaceId: spaceId
      });      

      const ElementBusiness = proxyquire("../../../../app/business/element-business", {
        "../data": {
          space: {
            getSpace: async () => expectedSpace
          },
          element: {
            getElementById: async () =>  elementResult,
            updateElement: async (elemId, elem) => {
              should(elem).have.property('face');
              should(elem.face).be.equal('bottom');
            }
          }
        }
      });
      
      const turnRobotResult = await ElementBusiness.turnRobot(spaceId, robotId, 'left');
      
      should(turnRobotResult).have.property('status');
      should(turnRobotResult.status).be.equal(200);
      should(turnRobotResult).have.property('content');
      should(turnRobotResult.content).have.property('success');
      should(turnRobotResult.content.success).be.true;
    });
    
    it('should turn left and update face from right to top.', async function() {
      let elementResult = new Element({
        _id: robotId,
        row: 2,
        column: 3,
        face: 'right',
        type: Element.Types.ROBOT,
        spaceId: spaceId
      });      

      const ElementBusiness = proxyquire("../../../../app/business/element-business", {
        "../data": {
          space: {
            getSpace: async () => expectedSpace
          },
          element: {
            getElementById: async () =>  elementResult,
            updateElement: async (elemId, elem) => {
              should(elem).have.property('face');
              should(elem.face).be.equal('top');
            }
          }
        }
      });
      
      const turnRobotResult = await ElementBusiness.turnRobot(spaceId, robotId, 'left');
      
      should(turnRobotResult).have.property('status');
      should(turnRobotResult.status).be.equal(200);
      should(turnRobotResult).have.property('content');
      should(turnRobotResult.content).have.property('success');
      should(turnRobotResult.content.success).be.true;
    });    
    
    it('should turn left and update face from top to left.', async function() {
      let elementResult = new Element({
        _id: robotId,
        row: 2,
        column: 3,
        face: 'top',
        type: Element.Types.ROBOT,
        spaceId: spaceId
      });      

      const ElementBusiness = proxyquire("../../../../app/business/element-business", {
        "../data": {
          space: {
            getSpace: async () => expectedSpace
          },
          element: {
            getElementById: async () =>  elementResult,
            updateElement: async (elemId, elem) => {
              should(elem).have.property('face');
              should(elem.face).be.equal('left');
            }
          }
        }
      });
      
      const turnRobotResult = await ElementBusiness.turnRobot(spaceId, robotId, 'left');
      
      should(turnRobotResult).have.property('status');
      should(turnRobotResult.status).be.equal(200);
      should(turnRobotResult).have.property('content');
      should(turnRobotResult.content).have.property('success');
      should(turnRobotResult.content.success).be.true;
    });  
    
    it('should turn left and update face from bottom to right.', async function() {
      let elementResult = new Element({
        _id: robotId,
        row: 2,
        column: 3,
        face: 'bottom',
        type: Element.Types.ROBOT,
        spaceId: spaceId
      });      

      const ElementBusiness = proxyquire("../../../../app/business/element-business", {
        "../data": {
          space: {
            getSpace: async () => expectedSpace
          },
          element: {
            getElementById: async () =>  elementResult,
            updateElement: async (elemId, elem) => {
              should(elem).have.property('face');
              should(elem.face).be.equal('right');
            }
          }
        }
      });
      
      const turnRobotResult = await ElementBusiness.turnRobot(spaceId, robotId, 'left');
      
      should(turnRobotResult).have.property('status');
      should(turnRobotResult.status).be.equal(200);
      should(turnRobotResult).have.property('content');
      should(turnRobotResult.content).have.property('success');
      should(turnRobotResult.content.success).be.true;
    });      

    it('should turn right and update face from left to top.', async function() {
      let elementResult = new Element({
        _id: robotId,
        row: 2,
        column: 3,
        face: 'left',
        type: Element.Types.ROBOT,
        spaceId: spaceId
      });      

      const ElementBusiness = proxyquire("../../../../app/business/element-business", {
        "../data": {
          space: {
            getSpace: async () => expectedSpace
          },
          element: {
            getElementById: async () =>  elementResult,
            updateElement: async (elemId, elem) => {
              should(elem).have.property('face');
              should(elem.face).be.equal('top');
            }
          }
        }
      });
      
      const turnRobotResult = await ElementBusiness.turnRobot(spaceId, robotId, 'right');
      
      should(turnRobotResult).have.property('status');
      should(turnRobotResult.status).be.equal(200);
      should(turnRobotResult).have.property('content');
      should(turnRobotResult.content).have.property('success');
      should(turnRobotResult.content.success).be.true;
    });
    
    it('should turn right and update face from right to bottom.', async function() {
      let elementResult = new Element({
        _id: robotId,
        row: 2,
        column: 3,
        face: 'right',
        type: Element.Types.ROBOT,
        spaceId: spaceId
      });      

      const ElementBusiness = proxyquire("../../../../app/business/element-business", {
        "../data": {
          space: {
            getSpace: async () => expectedSpace
          },
          element: {
            getElementById: async () =>  elementResult,
            updateElement: async (elemId, elem) => {
              should(elem).have.property('face');
              should(elem.face).be.equal('bottom');
            }
          }
        }
      });
      
      const turnRobotResult = await ElementBusiness.turnRobot(spaceId, robotId, 'right');
      
      should(turnRobotResult).have.property('status');
      should(turnRobotResult.status).be.equal(200);
      should(turnRobotResult).have.property('content');
      should(turnRobotResult.content).have.property('success');
      should(turnRobotResult.content.success).be.true;
    });    
    
    it('should turn right and update face from top to right.', async function() {
      let elementResult = new Element({
        _id: robotId,
        row: 2,
        column: 3,
        face: 'top',
        type: Element.Types.ROBOT,
        spaceId: spaceId
      });      

      const ElementBusiness = proxyquire("../../../../app/business/element-business", {
        "../data": {
          space: {
            getSpace: async () => expectedSpace
          },
          element: {
            getElementById: async () =>  elementResult,
            updateElement: async (elemId, elem) => {
              should(elem).have.property('face');
              should(elem.face).be.equal('right');
            }
          }
        }
      });
      
      const turnRobotResult = await ElementBusiness.turnRobot(spaceId, robotId, 'right');
      
      should(turnRobotResult).have.property('status');
      should(turnRobotResult.status).be.equal(200);
      should(turnRobotResult).have.property('content');
      should(turnRobotResult.content).have.property('success');
      should(turnRobotResult.content.success).be.true;
    });  
    
    it('should turn right and update face from bottom to left.', async function() {
      let elementResult = new Element({
        _id: robotId,
        row: 2,
        column: 3,
        face: 'bottom',
        type: Element.Types.ROBOT,
        spaceId: spaceId
      });      

      const ElementBusiness = proxyquire("../../../../app/business/element-business", {
        "../data": {
          space: {
            getSpace: async () => expectedSpace
          },
          element: {
            getElementById: async () =>  elementResult,
            updateElement: async (elemId, elem) => {
              should(elem).have.property('face');
              should(elem.face).be.equal('left');
            }
          }
        }
      });
      
      const turnRobotResult = await ElementBusiness.turnRobot(spaceId, robotId, 'right');
      
      should(turnRobotResult).have.property('status');
      should(turnRobotResult.status).be.equal(200);
      should(turnRobotResult).have.property('content');
      should(turnRobotResult.content).have.property('success');
      should(turnRobotResult.content.success).be.true;
    });      

    it('should return a error for invalid space.', async function() {
      let invalidSpaceId = 1111111
      let elementParam = {
        row: 2,
        column: 3,
        face: Element.Faces.LEFT
      }
    
      const ElementBusiness = proxyquire("../../../../app/business/element-business", {
        "../data": {
          space: {
            getSpace: async () => null
          },
          element: {
            getElementById: async () => null
          }
        }
      });
      
      const turnRobotResult = await ElementBusiness.turnRobot(invalidSpaceId, robotId, 'right');
      
      should(turnRobotResult).have.property('status');
      should(turnRobotResult.status).be.equal(404);

      should(turnRobotResult).have.property('content');
      should(turnRobotResult.content).have.property('code');
      should(turnRobotResult.content).have.property('message');
      should(turnRobotResult.content.code).be.equals("SPACE_NOT_FOUND");
    });    

    it('should return a error for invalid robot.', async function() {
      let invalidRobotId = 1111111
      let elementParam = {
        row: 2,
        column: 3,
        face: Element.Faces.LEFT
      }
    
      const ElementBusiness = proxyquire("../../../../app/business/element-business", {
        "../data": {
          space: {
            getSpace: async () => expectedSpace
          },
          element: {
            getElementById: async () => null
          }
        }
      });
      
      const turnRobotResult = await ElementBusiness.turnRobot(spaceId, invalidRobotId, 'right');
      
      should(turnRobotResult).have.property('status');
      should(turnRobotResult.status).be.equal(404);

      should(turnRobotResult).have.property('content');
      should(turnRobotResult.content).have.property('code');
      should(turnRobotResult.content).have.property('message');
      should(turnRobotResult.content.code).be.equals("ROBOT_NOT_FOUND");
    });  

  });    

  describe('.moveRobot', function() {
    const spaceId = 123
    const robotId = 555
    const expectedSpace = new Space({_id: spaceId});
  
    it('should move forward and update row and column with face left.', async function() {
      let elementResult = new Element({
        _id: robotId,
        row: 2,
        column: 3,
        face: 'left',
        type: Element.Types.ROBOT,
        spaceId: spaceId
      });      

      const ElementBusiness = proxyquire("../../../../app/business/element-business", {
        "../data": {
          space: {
            getSpace: async () => expectedSpace
          },
          element: {
            getElementById: async () =>  elementResult,
            getElementByPosition: async () =>  null,
            updateElement: async (_elemId, elem) => {
              should(elem).have.property('row');
              should(elem.row).be.equal(2);
              should(elem).have.property('column');
              should(elem.column).be.equal(2);

            }
          }
        }
      });
      
      const moveRobotResult = await ElementBusiness.moveRobot(spaceId, robotId, 'forward');
      
      should(moveRobotResult).have.property('status');
      should(moveRobotResult.status).be.equal(200);
      should(moveRobotResult).have.property('content');
      should(moveRobotResult.content).have.property('success');
      should(moveRobotResult.content.success).be.true;
    });
    
    it('should move forward and update row and column with face right.', async function() {
      let elementResult = new Element({
        _id: robotId,
        row: 2,
        column: 3,
        face: 'right',
        type: Element.Types.ROBOT,
        spaceId: spaceId
      });      

      const ElementBusiness = proxyquire("../../../../app/business/element-business", {
        "../data": {
          space: {
            getSpace: async () => expectedSpace
          },
          element: {
            getElementById: async () =>  elementResult,
            getElementByPosition: async () =>  null,
            updateElement: async (_elemId, elem) => {
              should(elem).have.property('row');
              should(elem.row).be.equal(2);
              should(elem).have.property('column');
              should(elem.column).be.equal(4);

            }
          }
        }
      });
      
      const moveRobotResult = await ElementBusiness.moveRobot(spaceId, robotId, 'forward');
      
      should(moveRobotResult).have.property('status');
      should(moveRobotResult.status).be.equal(200);
      should(moveRobotResult).have.property('content');
      should(moveRobotResult.content).have.property('success');
      should(moveRobotResult.content.success).be.true;
    });    
    
    it('should move forward and update row and column with face top.', async function() {
      let elementResult = new Element({
        _id: robotId,
        row: 2,
        column: 3,
        face: 'top',
        type: Element.Types.ROBOT,
        spaceId: spaceId
      });      

      const ElementBusiness = proxyquire("../../../../app/business/element-business", {
        "../data": {
          space: {
            getSpace: async () => expectedSpace
          },
          element: {
            getElementById: async () =>  elementResult,
            getElementByPosition: async () =>  null,
            updateElement: async (_elemId, elem) => {
              should(elem).have.property('row');
              should(elem.row).be.equal(1);
              should(elem).have.property('column');
              should(elem.column).be.equal(3);
            }
          }
        }
      });
      
      const moveRobotResult = await ElementBusiness.moveRobot(spaceId, robotId, 'forward');
      
      should(moveRobotResult).have.property('status');
      should(moveRobotResult.status).be.equal(200);
      should(moveRobotResult).have.property('content');
      should(moveRobotResult.content).have.property('success');
      should(moveRobotResult.content.success).be.true;
    });  
    
    it('should move forward and update row and column with face bottom.', async function() {
      let elementResult = new Element({
        _id: robotId,
        row: 2,
        column: 3,
        face: 'bottom',
        type: Element.Types.ROBOT,
        spaceId: spaceId
      });      

      const ElementBusiness = proxyquire("../../../../app/business/element-business", {
        "../data": {
          space: {
            getSpace: async () => expectedSpace
          },
          element: {
            getElementById: async () =>  elementResult,
            getElementByPosition: async () =>  null,
            updateElement: async (_elemId, elem) => {
              should(elem).have.property('row');
              should(elem.row).be.equal(3);
              should(elem).have.property('column');
              should(elem.column).be.equal(3);

            }
          }
        }
      });
      
      const moveRobotResult = await ElementBusiness.moveRobot(spaceId, robotId, 'forward');
      
      should(moveRobotResult).have.property('status');
      should(moveRobotResult.status).be.equal(200);
      should(moveRobotResult).have.property('content');
      should(moveRobotResult.content).have.property('success');
      should(moveRobotResult.content.success).be.true;
    });      

    it('should move backward and update row and column with face left.', async function() {
      let elementResult = new Element({
        _id: robotId,
        row: 2,
        column: 3,
        face: 'left',
        type: Element.Types.ROBOT,
        spaceId: spaceId
      });      

      const ElementBusiness = proxyquire("../../../../app/business/element-business", {
        "../data": {
          space: {
            getSpace: async () => expectedSpace
          },
          element: {
            getElementById: async () =>  elementResult,
            getElementByPosition: async () =>  null,
            updateElement: async (_elemId, elem) => {
              should(elem).have.property('row');
              should(elem.row).be.equal(2);
              should(elem).have.property('column');
              should(elem.column).be.equal(4);

            }
          }
        }
      });
      
      const moveRobotResult = await ElementBusiness.moveRobot(spaceId, robotId, 'backward');
      
      should(moveRobotResult).have.property('status');
      should(moveRobotResult.status).be.equal(200);
      should(moveRobotResult).have.property('content');
      should(moveRobotResult.content).have.property('success');
      should(moveRobotResult.content.success).be.true;
    });
    
    it('should move backward and update row and column with face right.', async function() {
      let elementResult = new Element({
        _id: robotId,
        row: 2,
        column: 3,
        face: 'right',
        type: Element.Types.ROBOT,
        spaceId: spaceId
      });      

      const ElementBusiness = proxyquire("../../../../app/business/element-business", {
        "../data": {
          space: {
            getSpace: async () => expectedSpace
          },
          element: {
            getElementById: async () =>  elementResult,
            getElementByPosition: async () =>  null,
            updateElement: async (_elemId, elem) => {
              should(elem).have.property('row');
              should(elem.row).be.equal(2);
              should(elem).have.property('column');
              should(elem.column).be.equal(2);

            }
          }
        }
      });
      
      const moveRobotResult = await ElementBusiness.moveRobot(spaceId, robotId, 'backward');
      
      should(moveRobotResult).have.property('status');
      should(moveRobotResult.status).be.equal(200);
      should(moveRobotResult).have.property('content');
      should(moveRobotResult.content).have.property('success');
      should(moveRobotResult.content.success).be.true;
    });    
    
    it('should move backward and update row and column with face top.', async function() {
      let elementResult = new Element({
        _id: robotId,
        row: 2,
        column: 3,
        face: 'top',
        type: Element.Types.ROBOT,
        spaceId: spaceId
      });      

      const ElementBusiness = proxyquire("../../../../app/business/element-business", {
        "../data": {
          space: {
            getSpace: async () => expectedSpace
          },
          element: {
            getElementById: async () =>  elementResult,
            getElementByPosition: async () =>  null,
            updateElement: async (_elemId, elem) => {
              should(elem).have.property('row');
              should(elem.row).be.equal(3);
              should(elem).have.property('column');
              should(elem.column).be.equal(3);

            }
          }
        }
      });
      
      const moveRobotResult = await ElementBusiness.moveRobot(spaceId, robotId, 'backward');
      
      should(moveRobotResult).have.property('status');
      should(moveRobotResult.status).be.equal(200);
      should(moveRobotResult).have.property('content');
      should(moveRobotResult.content).have.property('success');
      should(moveRobotResult.content.success).be.true;
    });  
    
    it('should move backward and update row and column with face bottom.', async function() {
      let elementResult = new Element({
        _id: robotId,
        row: 2,
        column: 3,
        face: 'bottom',
        type: Element.Types.ROBOT,
        spaceId: spaceId
      });      

      const ElementBusiness = proxyquire("../../../../app/business/element-business", {
        "../data": {
          space: {
            getSpace: async () => expectedSpace
          },
          element: {
            getElementById: async () =>  elementResult,
            getElementByPosition: async () =>  null,
            updateElement: async (_elemId, elem) => {
              should(elem).have.property('row');
              should(elem.row).be.equal(1);
              should(elem).have.property('column');
              should(elem.column).be.equal(3);

            }
          }
        }
      });
      
      const moveRobotResult = await ElementBusiness.moveRobot(spaceId, robotId, 'backward');
      
      should(moveRobotResult).have.property('status');
      should(moveRobotResult.status).be.equal(200);
      should(moveRobotResult).have.property('content');
      should(moveRobotResult.content).have.property('success');
      should(moveRobotResult.content.success).be.true;
    });      

    it('should return a error for invalid space.', async function() {
      let invalidSpaceId = 1111111
      let elementParam = {
        row: 2,
        column: 3,
        face: Element.Faces.LEFT
      }
    
      const ElementBusiness = proxyquire("../../../../app/business/element-business", {
        "../data": {
          space: {
            getSpace: async () => null
          },
          element: {
            getElementById: async () => null
          }
        }
      });
      
      const moveRobotResult = await ElementBusiness.moveRobot(spaceId, robotId, 'backward');
      
      should(moveRobotResult).have.property('status');
      should(moveRobotResult.status).be.equal(404);

      should(moveRobotResult).have.property('content');
      should(moveRobotResult.content).have.property('code');
      should(moveRobotResult.content).have.property('message');
      should(moveRobotResult.content.code).be.equals("SPACE_NOT_FOUND");
    });    

    it('should return a error for invalid robot.', async function() {
      let invalidRobotId = 1111111
      let elementParam = {
        row: 2,
        column: 3,
        face: Element.Faces.LEFT
      }
    
      const ElementBusiness = proxyquire("../../../../app/business/element-business", {
        "../data": {
          space: {
            getSpace: async () => expectedSpace
          },
          element: {
            getElementById: async () => null
          }
        }
      });
      
      const moveRobotResult = await ElementBusiness.moveRobot(spaceId, robotId, 'backward');
      
      should(moveRobotResult).have.property('status');
      should(moveRobotResult.status).be.equal(404);

      should(moveRobotResult).have.property('content');
      should(moveRobotResult.content).have.property('code');
      should(moveRobotResult.content).have.property('message');
      should(moveRobotResult.content.code).be.equals("ROBOT_NOT_FOUND");      
    });  

    it('should return a error for invalid position.', async function() {
      let elementResult = new Element({
        _id: robotId,
        row: 2,
        column: 3,
        face: 'bottom',
        type: Element.Types.ROBOT,
        spaceId: spaceId
      });      

      const ElementBusiness = proxyquire("../../../../app/business/element-business", {
        "../data": {
          space: {
            getSpace: async () => expectedSpace
          },
          element: {
            getElementById: async () =>  elementResult,
            getElementByPosition: async () =>  elementResult
          }
        }
      });
      
      const moveRobotResult = await ElementBusiness.moveRobot(spaceId, robotId, 'backward');
      
      should(moveRobotResult).have.property('status');
      should(moveRobotResult.status).be.equal(409);

      should(moveRobotResult).have.property('content');
      should(moveRobotResult.content).have.property('code');
      should(moveRobotResult.content).have.property('message');
      should(moveRobotResult.content.code).be.equals("ALREADY_FILLED_POSITION");
    });       

  }); 
  
  describe('.robotAttack', function() {
    const spaceId = 123
    const robotId = 555
    const expectedSpace = new Space({_id: spaceId});
  
    it('should robot attack remove any dinosaur around.', async function() {
      const elementResult = new Element({
        _id: robotId,
        row: 2,
        column: 3,
        face: 'left',
        type: Element.Types.ROBOT,
        spaceId: spaceId
      });     
      
      const expectedRows = [1,2,3];
      const expectedColumns = [2,3,4];

      const ElementBusiness = proxyquire("../../../../app/business/element-business", {
        "../data": {
          space: {
            getSpace: async () => expectedSpace
          },
          element: {
            getElementById: async () =>  elementResult,
            deleteElementsByRowsAndColumns: async (rows, columns, type, currSpaceId) => {
              should(testHelper.compareArray(expectedRows, rows)).be.true;
              should(testHelper.compareArray(expectedColumns, columns)).be.true;
              should(type).be.equal(Element.Types.DINOSAUR);
              should(currSpaceId).be.equal(spaceId);
            }
          }
        }
      });
      
      const moveRobotResult = await ElementBusiness.robotAttack(spaceId, robotId);
      
      should(moveRobotResult).have.property('status');
      should(moveRobotResult.status).be.equal(200);
      should(moveRobotResult).have.property('content');
      should(moveRobotResult.content).have.property('success');
      should(moveRobotResult.content.success).be.true;
    });
    
 
    it('should return a error for invalid space.', async function() {
      let invalidSpaceId = 1111111
      let elementParam = {
        row: 2,
        column: 3,
        face: Element.Faces.LEFT
      }
    
      const ElementBusiness = proxyquire("../../../../app/business/element-business", {
        "../data": {
          space: {
            getSpace: async () => null
          },
          element: {
            getElementById: async () => null
          }
        }
      });
      
      const moveRobotResult = await ElementBusiness.robotAttack(spaceId, robotId);
      
      should(moveRobotResult).have.property('status');
      should(moveRobotResult.status).be.equal(404);

      should(moveRobotResult).have.property('content');
      should(moveRobotResult.content).have.property('code');
      should(moveRobotResult.content).have.property('message');
      should(moveRobotResult.content.code).be.equals("SPACE_NOT_FOUND");
    });    

    it('should return a error for invalid robot.', async function() {
      let invalidRobotId = 1111111
      let elementParam = {
        row: 2,
        column: 3,
        face: Element.Faces.LEFT
      }
    
      const ElementBusiness = proxyquire("../../../../app/business/element-business", {
        "../data": {
          space: {
            getSpace: async () => expectedSpace
          },
          element: {
            getElementById: async () => null
          }
        }
      });
      
      const moveRobotResult = await ElementBusiness.robotAttack(spaceId, robotId);
      
      should(moveRobotResult).have.property('status');
      should(moveRobotResult.status).be.equal(404);

      should(moveRobotResult).have.property('content');
      should(moveRobotResult.content).have.property('code');
      should(moveRobotResult.content).have.property('message');
      should(moveRobotResult.content.code).be.equals("ROBOT_NOT_FOUND");      
    });  


  });   
});