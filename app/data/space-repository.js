const db = require("../../libs/in-memory-db").db;
const models = require("../models");
const Space = models.data.space;
const DatabaseError = models.errors.database.DatabaseError;
const spacesCollectionName = "spaces";
const elementsCollectionName = "elements";

class SpaceRepository {
    static createNewSpace(newSpace){
      return new Promise((resolve, reject) => {
        try {  
          let resultSpace = db.insert(spacesCollectionName, newSpace.toObject());
          let fromObjSpace = Space.fromObject(resultSpace) 
          resolve(fromObjSpace);
        }
        catch(err){
          reject(new DatabaseError());
        }
      });
    }

    static getSpace(spaceId){
      return new Promise((resolve, reject) => {
        try {
          let querySpace = { _id: { $eq: spaceId } };
          let queryElements = { spaceId: { $eq: spaceId } };
          let resultSpace = db.first(spacesCollectionName, querySpace);
          let elements = db.select(elementsCollectionName, queryElements);
          console.log(`########## getSpace elements : ${JSON.stringify(elements)}`)
          if(!resultSpace) resolve(null);
          let fromObjSpace = Space.fromObject(resultSpace); 
          fromObjSpace.filled = elements;
          resolve(fromObjSpace);
        }
        catch(err){
          reject(new DatabaseError());
        }
      });
    }    
}

module.exports = SpaceRepository;