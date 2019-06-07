const testHelper = require("../../../test-helper");
const Element = require("../../../../app/models").data.element;
const should = testHelper.should();
const proxyquire = require("proxyquire");

describe("ElementRepository", function()
{
  describe('.createNewElement', function() {

    it('should create and return a new element success.', async function() {
      let expectedElement = new Element({
        row: 2,
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
      should(newElement).have.property('row');
      should(newElement).have.property('column');
      should(newElement).have.property('face');
      should(newElement).have.property('type');
      should(newElement).have.property('spaceId');
      
      should(newElement._id).be.equal(expectedElement._id);

      should(newElement.row).be.equal(expectedElement.row);
      should(newElement.column).be.equal(expectedElement.column);
      should(newElement.face).be.equal(expectedElement.face);
      should(newElement.type).be.equal(expectedElement.type);
    });

  });
  
  describe('.getElement', function() {

    it('should return element by id success.', async function() {
      let expectedElement = new Element({
        row: 2,
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
      
      let element = await ElementRepository.getElement(expectedElement);
      
      should(element).have.property('_id');
      should(element).have.property('row');
      should(element).have.property('column');
      should(element).have.property('face');
      should(element).have.property('type');
      should(element).have.property('spaceId');
      
      should(element._id).be.equal(expectedElement._id);

      should(element.row).be.equal(expectedElement.row);
      should(element.column).be.equal(expectedElement.column);
      should(element.face).be.equal(expectedElement.face);
      should(element.type).be.equal(expectedElement.type);
    });

  });
  
  describe('.updateElement', function() {

    it('should update element by id success.', async function() {
      const elementId = 789
      const updateElement = {
        row: 22,
        column: 33,
        face: Element.Faces.TOP
      };      
      
      const ElementRepository = proxyquire("../../../../app/data/element-repository", {
        "../../libs/in-memory-db": {
          db: {
            update: (col, elem, query)  => {  
              return col == "elements"
                     elem.row == updateElement.row &&
                     elem.column == updateElement.column &&
                     elem.face == updateElement.face &&
                     query._id.$eq == elementId
            }
          }
        }
      });
      
      let result = await ElementRepository.updateElement(elementId, updateElement);
      should(result).be.true;
      
    });

  });

});