const Controllers = require("./controllers");
const errorHandler = require("./error-handler");

class Routes {
    static loadRoutes(router){
        router.get('/', (req,res) => res.json({ message: "Working success !!!" }));
        router.get('/spaces/new', Controllers.spaces.newSpace);
        router.get('/spaces/:id', Controllers.spaces.getSpace);
        router.post('/spaces/:spaceId/robots', Controllers.robot.newRobot);
        router.post('/spaces/:spaceId/dinosaurs', Controllers.dinosaur.newDinosaur);
        router.use(errorHandler.notFoundHandler);
        router.use(errorHandler.internalErrorHandler);
    }
}

module.exports = Routes;