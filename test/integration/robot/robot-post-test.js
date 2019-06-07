const request = require('supertest');
const testHelper = require('../../test-helper');
const server = testHelper.server();
const should = testHelper.should();

describe("POST /spaces/:spaceId/robots", function()
{
  it('should create and return a new robot success.', async function() {
    await request(server.handler)
    .get('/spaces/new')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .then(async response => {
      should(response.body).have.property('_id');
      const spaceId = response.body._id;
      const elementParams = {line: 3, column: 5, face: "left"}
      
      await request(server.handler)
      .post(`/spaces/${spaceId}/robots`)
      .set('Accept', 'application/json')
      .send(elementParams)
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
          should(response.body).have.property('_id');
          should(response.body).have.property('face');
          should(response.body).have.property('line');
          should(response.body).have.property('column');
          should(response.body).have.property('spaceId');
          should(response.body).have.property('type');
          should(response.body.face).be.equal(elementParams.face);
          should(response.body.line).be.equal(elementParams.line);
          should(response.body.column).be.equal(elementParams.column);
          should(response.body.spaceId).be.equal(spaceId);
          should(response.body.type).be.equal("robot");
      });      
    });
  });
});    