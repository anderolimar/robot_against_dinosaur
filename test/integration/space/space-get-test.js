const request = require('supertest');
const testHelper = require('../../test-helper');
const models = require('../../../app/models');
const Space = models.data.space;
const SpaceRepository = require('../../../app/data/space-repository');
const server = testHelper.server();
const should = testHelper.should();

describe("/spaces/:id", function()
{
  it('should return space success.', async function() {
    let space = await SpaceRepository.createNewSpace(new Space());

    await request(server.handler)
      .get(`/spaces/${space._id}`)
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-Type', /json/)
      .then(response => {
        should(response.body).have.property('_id');
        should(response.body._id).be.equal(space._id);

        should(response.body).have.property('filled');
        should(response.body.filled instanceof Array).be.true;

        should(response.body).have.property('lines');
        should(response.body.lines).have.property('start');
        should(response.body.lines).have.property('end');
        should(response.body.lines.start).be.equal(1);
        should(response.body.lines.end).be.equal(50);

        should(response.body).have.property('columns');
        should(response.body.columns).have.property('start');
        should(response.body.columns).have.property('end');
        should(response.body.columns.start).be.equal(1);
        should(response.body.columns.end).be.equal(50);          
      });
  });
});    