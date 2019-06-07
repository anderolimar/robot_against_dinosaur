const proxyquire = require("proxyquire");
const testHelper = require("../../../test-helper");
const models = require("../../../../app/models"); 
const Space = models.data.space;
const should = testHelper.should();

describe("SpacesBusiness", function()
{
  describe('.createNewSpace', function() {

    it('should create and return a new space success.', async function() {
      let expectedSpace = new Space({});
      expectedSpace._id = 123;

      const SpaceBusiness = proxyquire("../../../../app/business/space-business", {
        "../data": {
          space: {
            createNewSpace: async () => expectedSpace
          }
        }
      });
      
      let newSpace = await SpaceBusiness.createNewSpace();
      
      should(newSpace).have.property('status');
      should(newSpace.status).be.equal(200);

      should(newSpace).have.property('content');
      should(newSpace.content).have.property('_id');
      should(newSpace.content).have.property('rows');
      should(newSpace.content).have.property('columns');
      should(newSpace.content).have.property('filled');
      
      should(newSpace.content._id).be.equal(expectedSpace._id);
      should(newSpace.content.filled instanceof Array).be.true;

      should(newSpace.content.rows).have.property('start');
      should(newSpace.content.rows).have.property('end');
      should(newSpace.content.rows.start).be.equal(expectedSpace.rows.start);
      should(newSpace.content.rows.end).be.equal(expectedSpace.rows.end);

      should(newSpace.content.columns).have.property('start');
      should(newSpace.content.columns).have.property('end');
      should(newSpace.content.columns.start).be.equal(expectedSpace.columns.start);
      should(newSpace.content.columns.end).be.equal(expectedSpace.columns.end);
    });

  });

  describe('.getSpace', function() {

    it('should return space response success.', async function() {
      let expectedSpace = new Space({});
      expectedSpace._id = 123;

      const SpaceBusiness = proxyquire("../../../../app/business/space-business", {
        "../data": {
          space: {
            getSpace: async (spaceId) => { 
              return new Promise((res, rej) => {
                if(spaceId == 123) {
                  return res(expectedSpace);
                }
                return res(null); 
              });
            }
          }
        }
      });
      
      let newSpace = await SpaceBusiness.getSpace(123);
      
      should(newSpace).have.property('status');
      should(newSpace.status).be.equal(200);

      should(newSpace).have.property('content');
      should(newSpace.content).have.property('_id');
      should(newSpace.content).have.property('rows');
      should(newSpace.content).have.property('columns');
      should(newSpace.content).have.property('filled');
      
      should(newSpace.content._id).be.equal(expectedSpace._id);
      should(newSpace.content.filled instanceof Array).be.true;

      should(newSpace.content.rows).have.property('start');
      should(newSpace.content.rows).have.property('end');
      should(newSpace.content.rows.start).be.equal(expectedSpace.rows.start);
      should(newSpace.content.rows.end).be.equal(expectedSpace.rows.end);

      should(newSpace.content.columns).have.property('start');
      should(newSpace.content.columns).have.property('end');
      should(newSpace.content.columns.start).be.equal(expectedSpace.columns.start);
      should(newSpace.content.columns.end).be.equal(expectedSpace.columns.end);
    });

  });
});