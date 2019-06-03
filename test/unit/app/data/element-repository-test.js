const proxyquire = require("proxyquire");
const testHelper = require("../../../test-helper");
const Element = require("../../../../app/models").data.element;
const should = testHelper.should();

describe("ElementRepository", function()
{
  describe('.createNewElement', function() {

    it('should create and return a new element success.', async function() {
      let expectedElement = new Element({
        line: 2,
        column: 3,
        face: Element.Faces.LEFT,
        type: Element.Types.ROBOT
      });
      
      const ElementRepository = proxyquire("../../../../app/data/element-repository", {
        "../../libs/in-memory-db": {
          db: {
            insert: ()  => {  
              expectedElement._id = 123;
              return expectedElement.toObject();
            }
          }
        }
      });
      
      let newElement = await ElementRepository.createNewElement(expectedElement);
      
      should(newElement).have.property('_id');
      should(newElement).have.property('line');
      should(newElement).have.property('column');
      should(newElement).have.property('face');
      should(newElement).have.property('type');
      should(newElement).have.property('spaceId');
      
      should(newElement._id).be.equal(expectedElement._id);

      should(newElement.line).be.equal(expectedElement.line);
      should(newElement.column).be.equal(expectedElement.column);
      should(newElement.face).be.equal(expectedElement.face);
      should(newElement.type).be.equal(expectedElement.type);
    });

  });
  
  describe('.getElement', function() {

    it('should return space by id success.', async function() {
      let expectedElement = new Element({
        line: 2,
        column: 3,
        face: Element.Faces.LEFT,
        type: Element.Types.ROBOT
      });
      
      const ElementRepository = proxyquire("../../../../app/data/element-repository", {
        "../../libs/in-memory-db": {
          db: {
            first: ()  => {  
              
              expectedElement._id = 123;
              return expectedElement.toObject();
            }
          }
        }
      });
      
      let newElement = await ElementRepository.createNewElement(expectedElement);
      
      should(newElement).have.property('_id');
      should(newElement).have.property('line');
      should(newElement).have.property('column');
      should(newElement).have.property('face');
      should(newElement).have.property('type');
      should(newElement).have.property('spaceId');
      
      should(newElement._id).be.equal(expectedElement._id);

      should(newElement.line).be.equal(expectedElement.line);
      should(newElement.column).be.equal(expectedElement.column);
      should(newElement.face).be.equal(expectedElement.face);
      should(newElement.type).be.equal(expectedElement.type);
    });

  });
  
});