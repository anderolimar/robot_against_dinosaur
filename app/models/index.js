const Space = require("./data/space");
const Element = require("./data/element");
const SpaceResponses = require("./responses/space-responses");
const ElementResponses = require("./responses/element-responses");
const CommonsResponse = require("./responses/commons-response");
const DatabaseErrors = require("./errors/database-errors");


module.exports = {
  data: { 
    space:  Space,
    element: Element
  },
  responses: {
    commons: CommonsResponse,
    space: SpaceResponses,
    element: ElementResponses
  },
  errors: {
    database: DatabaseErrors
  }
}