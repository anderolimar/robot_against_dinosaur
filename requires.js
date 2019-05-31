/*global __base*/
/*global __requires*/

global.__base = __dirname + '/';

global.__require = function(name){
    return require(__base + paths[name]);
}

var paths = {
    //server
    "server"                : "server",
    //app 
    "app"                   : "app",
    "routes"                : "app/routes",
    //controllers
    "controllers"           : "app/controllers", 
    //data
    "data"                  : "app/data",
    //models
    "models"                : "app/models",    
    //libs
    "in-memory-db"          : "libs/in-memory-db" 
}

