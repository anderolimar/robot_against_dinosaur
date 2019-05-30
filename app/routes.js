/*global __require*/

var Controllers = __require("controllers");

class Routes {
    
    static loadRoutes(router){
        router.get('/', (req,res) => res.json({ message: "Working success !!!" }));
        
        router.get('/space/new', Controllers.spaces.newSpace);
    }
    
}

module.exports = Routes;