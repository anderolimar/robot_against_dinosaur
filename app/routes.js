const Controllers = require("./controllers");
const errorHandler = require("./error-handler");

class Routes {
    static loadRoutes(router){
        router.get('/', (req,res) => res.json({ message: "Working success !!!" }));
        router.get('/spaces/new', Controllers.spaces.newSpace);
        router.get('/spaces/:id', Controllers.spaces.getSpace);
        router.use(errorHandler.handler);
    }
}

module.exports = Routes;