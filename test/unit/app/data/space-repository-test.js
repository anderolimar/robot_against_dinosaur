const testHelper = require("../../../test-helper");
const Space = require("../../../../app/models").data.space;
const should = testHelper.should();
const proxyquire = require("proxyquire");

describe("SpaceRepository", function()
{
  describe('.createNewSpace', function() {

    it('should create and return a new space success.', async function() {
      let expectedSpace = new Space();
      const SpaceRepository = proxyquire("../../../../app/data/space-repository", {
        "../../libs/in-memory-db": {
          db: {
            insert: ()  => {  
              expectedSpace._id = 123;
              return expectedSpace.toObject();
            }
          }
        }
      });
      
      let newSpace = await SpaceRepository.createNewSpace(expectedSpace);
      
      should(newSpace).have.property('_id');
      should(newSpace).have.property('rows');
      should(newSpace).have.property('columns');
      should(newSpace).have.property('filled');
      
      should(newSpace._id).be.equal(expectedSpace._id);
      should(newSpace.filled instanceof Array).be.true;

      should(newSpace.rows).have.property('start');
      should(newSpace.rows).have.property('end');
      should(newSpace.rows.start).be.equal(expectedSpace.rows.start);
      should(newSpace.rows.end).be.equal(expectedSpace.rows.end);

      should(newSpace.columns).have.property('start');
      should(newSpace.columns).have.property('end');
      should(newSpace.columns.start).be.equal(expectedSpace.columns.start);
      should(newSpace.columns.end).be.equal(expectedSpace.columns.end);
    });

  });
  
  describe('.getSpace', function() {

    it('should return space by id success.', async function() {
      let spaceId = 456;
      let expectedSpace = new Space();
      const SpaceRepository = proxyquire("../../../../app/data/space-repository", {
        "../../libs/in-memory-db": {
          db: {
            first: () => {  
              expectedSpace._id = spaceId;
              return expectedSpace.toObject();
            },
            select: () =>{
              return [{}];
            }
          }
        }
      });
      
      let space = await SpaceRepository.getSpace(spaceId);
      
      should(space).have.property('_id');
      should(space).have.property('rows');
      should(space).have.property('columns');
      should(space).have.property('filled');
      
      should(space._id).be.equal(expectedSpace._id);
      should(space.filled instanceof Array).be.true;
      should(space.filled.length).be.equal(1);

      should(space.rows).have.property('start');
      should(space.rows).have.property('end');
      should(space.rows.start).be.equal(expectedSpace.rows.start);
      should(space.rows.end).be.equal(expectedSpace.rows.end);

      should(space.columns).have.property('start');
      should(space.columns).have.property('end');
      should(space.columns.start).be.equal(expectedSpace.columns.start);
      should(space.columns.end).be.equal(expectedSpace.columns.end);
    });

  });
  
});