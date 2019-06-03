const db = require("../../libs/in-memory-db").db;
const models = require("../models");
const Element = models.data.element;
const DatabaseError = models.errors.database.DatabaseError;
const collectionName = "elements";

class ElementsRepository {
  static createNewElement(newElement){
    return new Promise((resolve, reject) => {
      try {  
        let resultElement = db.insert(collectionName, newElement.toObject());
        let fromObjElement = Element.fromObject(resultElement) 
        resolve(fromObjElement);
      }
      catch(err){
        reject(new DatabaseError());
      }
    });
  }

  static getElement(elementId){
    return new Promise((resolve, reject) => {
      try {
        let query = { _id: { $eq: elementId } };
        let resultElement = db.first(collectionName, query);
        if(!resultElement) resolve(null);
        let fromObjElement = Element.fromObject(resultElement) 
        resolve(fromObjElement);
      }
      catch(err){
        reject(new DatabaseError());
      }
    });
  }   
  
  static updateElement(elementId, updateProperties){
    return new Promise((resolve, reject) => {
      try {
        let query = { _id: { $eq: elementId } };
        let resultUpdate = db.update(collectionName, updateProperties, query);
        resolve(resultUpdate);
      }
      catch(err){
        reject(new DatabaseError());
      }
    });
  }   
}

module.exports = ElementsRepository;