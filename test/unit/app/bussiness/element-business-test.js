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
        line: 2,
        column: 3,
        face: Element.Faces.LEFT
      }
      let expectedElement = new Element({
        line: 2,
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
      should(newRobot.content).have.property('line');
      should(newRobot.content).have.property('column');
      should(newRobot.content).have.property('face');
      should(newRobot.content).have.property('type');
      should(newRobot.content).have.property('spaceId');
      
      should(newRobot.content._id).be.equal(expectedElement._id);
      should(newRobot.content.line).be.equal(expectedElement.line);
      should(newRobot.content.column).be.equal(expectedElement.column);
      should(newRobot.content.face).be.equal(expectedElement.face);
      should(newRobot.content.type).be.equal(expectedElement.type);
      should(newRobot.content.spaceId).be.equal(expectedElement.spaceId);
    });

    it('should return a error for invalid line value.', async function() {
      let elementParam = {
        line: "a",
        column: 3,
        face: Element.Faces.LEFT
      }
    
      const ElementBusiness = proxyquire("../../../../app/business/element-business", {
        "../data": {
          space: {
            getSpace: async () => expectedSpace
          },
          element: {
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
      should(newRobot.content.errors[0].code).be.equals("INVALID_LINE_VALUE");
    });

    it('should return a error for invalid column value.', async function() {
      let elementParam = {
        line: 2,
        column: "c",
        face: Element.Faces.LEFT
      }
    
      const ElementBusiness = proxyquire("../../../../app/business/element-business", {
        "../data": {
          space: {
            getSpace: async () => expectedSpace
          },
          element: {
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
        line: 2,
        column: 3,
        face: "lef"
      }
    
      const ElementBusiness = proxyquire("../../../../app/business/element-business", {
        "../data": {
          space: {
            getSpace: async () => expectedSpace
          },
          element: {
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
      let invalidSpaceId = 0
      let elementParam = {
        line: 2,
        column: 3,
        face: Element.Faces.LEFT
      }
    
      const ElementBusiness = proxyquire("../../../../app/business/element-business", {
        "../data": {
          space: {
            getSpace: async () => null
          },
          element: {
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
      should(newRobot.content.code).be.equals("SPACE_ID_NOT_FOUND");
    });    

  });
});