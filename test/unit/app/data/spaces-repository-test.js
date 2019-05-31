/*global __require*/

var helper = require("../../../test-helper");
var Space = __require("models").space;
var SpacesRepository = __require("data").spaces;
var should = helper.should();

describe("SpacesRepository", function()
{
  describe('.createNewSpace', function() {

    it('should create and return a new space success.', async function() {
        let expectedSpace = new Space({});
        let newSpace = await SpacesRepository.createNewSpace(expectedSpace);
        
        console.log("#####################");
        console.log(JSON.stringify(newSpace));
        console.log("#####################");
        
        should(newSpace).have.property('_id');
        should(newSpace).have.property('lines');
        should(newSpace).have.property('columns');
        should(newSpace).have.property('filled');
        
        should(newSpace.lines).have.property('start');
        should(newSpace.lines).have.property('end');
        should(newSpace.lines.start).be.equal(expectedSpace.lines.start);
        should(newSpace.lines.end).be.equal(expectedSpace.lines.end);

        should(newSpace.columns).have.property('start');
        should(newSpace.columns).have.property('end');
        should(newSpace.columns.start).be.equal(expectedSpace.columns.start);
        should(newSpace.columns.end).be.equal(expectedSpace.columns.end);
    });

  });

});