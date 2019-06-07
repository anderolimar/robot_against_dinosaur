const request = require('supertest');
const testHelper = require('../../test-helper');
const server = testHelper.server();
const should = testHelper.should();

describe("GET /spaces/new", function()
{
  it('should create and return a new space success.', async function() {
    await request(server.handler)
      .get('/spaces/new')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
          should(response.body).have.property('_id');

          should(response.body).have.property('filled');
          should(response.body.filled instanceof Array).be.true;

          should(response.body).have.property('rows');
          should(response.body.rows).have.property('start');
          should(response.body.rows).have.property('end');
          should(response.body.rows.start).be.equal(1);
          should(response.body.rows.end).be.equal(50);

          should(response.body).have.property('columns');
          should(response.body.columns).have.property('start');
          should(response.body.columns).have.property('end');
          should(response.body.columns.start).be.equal(1);
          should(response.body.columns.end).be.equal(50);          
      });
  });
});    
