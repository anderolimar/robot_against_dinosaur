/*global __require*/

const db = __require("in-memory-db").db;
const Space = __require("models").space;
const collectionName = "spaces";

class SpacesRepository {
    static createNewSpace(newSpace){
        return new Promise((resolve, reject) => {
            SpacesRepository.ensureCollectionExists()
            let resultSpace = db.insert(collectionName, newSpace.toObject());
            let fromObjSpace = Space.fromObject(resultSpace) 
            resolve(fromObjSpace);
        });
    }
    
    static ensureCollectionExists(){
        if(!db.hasCollection(collectionName)) {
            db.createCollection(collectionName);
        }
    }
}

module.exports = SpacesRepository;