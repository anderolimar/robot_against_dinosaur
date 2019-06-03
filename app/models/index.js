var Space = require("./data/space");
const SpaceResponses = require("./responses/space-responses");
const CommonsResponse = require("./responses/commons-response");
const DatabaseErrors = require("./errors/database-errors");


module.exports = {
  data: { 
    space:  Space 
  },
  responses: {
    commons: CommonsResponse,
    space: SpaceResponses
  },
  errors: {
    database: DatabaseErrors
  }
}