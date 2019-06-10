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
      const elementParams = {row: 33, column: 15, face: "left"}
      
      await request(server.handler)
      .post(`/spaces/${spaceId}/robots`)
      .set('Accept', 'application/json')
      .send(elementParams)
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
          should(response.body).have.property('_id');
          should(response.body).have.property('face');
          should(response.body).have.property('row');
          should(response.body).have.property('column');
          should(response.body).have.property('spaceId');
          should(response.body).have.property('type');
          should(response.body.face).be.equal(elementParams.face);
          should(response.body.row).be.equal(elementParams.row);
          should(response.body.column).be.equal(elementParams.column);
          should(response.body.spaceId).be.equal(spaceId);
          should(response.body.type).be.equal("robot");
      });      
    });
  });
});  

describe("PUT /spaces/:spaceId/robots/:robotId/turnleft", function()
{
  it('should turn robot left success.', async function() {
    const responseNewSpace = await request(server.handler)
      .get('/spaces/new')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)

    should(responseNewSpace.body).have.property('_id');
    const spaceId = responseNewSpace.body._id;
    const elementParams = {row: 20, column: 20, face: "right"}
      
    const responseNewRobot = await request(server.handler)
      .post(`/spaces/${spaceId}/robots`)
      .set('Accept', 'application/json')
      .send(elementParams)
      .expect('Content-Type', /json/)
      .expect(200)

    should(responseNewRobot.body).have.property('_id');
    const robotId = responseNewRobot.body._id;

    const responseTurnLeft = await request(server.handler)
      .put(`/spaces/${spaceId}/robots/${robotId}/turnleft`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
    
    should(responseTurnLeft.body).have.property('success');
    should(responseTurnLeft.body.success).be.true;  

    /*await testHelper.sleep(1000).then(async _ => {

    const responseSpace = await request(server.handler)
      .get(`/spaces/${spaceId}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)

    console.log(`####### response: ${JSON.stringify(responseSpace)}`)
    should(responseSpace.body).have.property('filled');
    should(responseSpace.body.filled instanceof Array).be.true;
    should(responseSpace.body.filled.length).be.equals(1);

    should(responseSpace.body.filled[0]).have.property('face');
    should(responseSpace.body.filled[0].face).be.equal("top");
  });*/
  });        
});    
