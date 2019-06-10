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
  });        
});    


describe("PUT /spaces/:spaceId/robots/:robotId/turnright", function()
{
  it('should turn robot right success.', async function() {
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
      .put(`/spaces/${spaceId}/robots/${robotId}/turnright`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
    
    should(responseTurnLeft.body).have.property('success');
    should(responseTurnLeft.body.success).be.true;  
  });        
});  

describe("PUT /spaces/:spaceId/robots/:robotId/moveforward", function()
{
  it('should move robot forward success.', async function() {
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
      .put(`/spaces/${spaceId}/robots/${robotId}/moveforward`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
    
    should(responseTurnLeft.body).have.property('success');
    should(responseTurnLeft.body.success).be.true;  
  });        
}); 


describe("PUT /spaces/:spaceId/robots/:robotId/movebackward", function()
{
  it('should move robot backward success.', async function() {
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
      .put(`/spaces/${spaceId}/robots/${robotId}/movebackward`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
    
    should(responseTurnLeft.body).have.property('success');
    should(responseTurnLeft.body.success).be.true;  
  });        
}); 

describe("PUT /spaces/:spaceId/robots/:robotId/attack", function()
{
  it('should robot attack success.', async function() {
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
      .put(`/spaces/${spaceId}/robots/${robotId}/attack`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
    
    should(responseTurnLeft.body).have.property('success');
    should(responseTurnLeft.body.success).be.true;  
  });        
}); 
