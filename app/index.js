const Setup = require('./setup');
const Routes = require('./routes');

class App {
  start(router){
    Setup.start();
    Routes.loadRoutes(router);
  }
}

module.exports = new App();