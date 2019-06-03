const db = require('../libs/in-memory-db').db;

class Setup {
  static start(){
    initDb();
  }
}
 
function initDb(){
  if(!db.hasCollection("spaces")) {
      db.createCollection("spaces");
  }

  if(!db.hasCollection("elements")) {
    db.createCollection("elements");
  }      
}

module.exports = Setup;