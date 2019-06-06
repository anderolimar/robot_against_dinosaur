const Controllers = require("./controllers");
const errorHandler = require("./error-handler");

class Routes {
    static loadRoutes(router){
        router.get('/', (req,res) => res.json({ message: "Working success !!!" }));
        router.get('/spaces/new', Controllers.spaces.newSpace);
        router.get('/spaces/:id', Controllers.spaces.getSpace);
        router.post('/spaces/:id/robot', Controllers.robot.newRobot);
        router.use(errorHandler.notFoundHandler);
        router.use(errorHandler.internalErrorHandler);
    }
}

module.exports = Routes;