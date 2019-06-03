const db = require("../../libs/in-memory-db").db;
const models = require("../models");
const Space = models.data.space;
const DatabaseError = models.errors.database.DatabaseError;
const collectionName = "spaces";

class SpaceRepository {
    static createNewSpace(newSpace){
      return new Promise((resolve, reject) => {
        try {  
          let resultSpace = db.insert(collectionName, newSpace.toObject());
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
          let query = { _id: { $eq: spaceId } };
          let resultSpace = db.first(collectionName, query);
          if(!resultSpace) resolve(null);
          let fromObjSpace = Space.fromObject(resultSpace) 
          resolve(fromObjSpace);
        }
        catch(err){
          reject(new DatabaseError());
        }
      });
    }    
}

module.exports = SpaceRepository;