const db = require("../../libs/in-memory-db").db;
const models = require("../models");
const Element = models.data.element;
const DatabaseError = models.errors.database.DatabaseError;
const elementCollectionName = "elements";

class ElementsRepository {
  static createNewElement(newElement){
    return new Promise((resolve, reject) => {
      try {  
        let resultElement = db.insert(elementCollectionName, newElement.toObject());
        let fromObjElement = Element.fromObject(resultElement) 
        resolve(fromObjElement);
      }
      catch(err){
        reject(new DatabaseError());
      }
    });
  }

  static getElementById(elementId){
    return new Promise((resolve, reject) => {
      try {
        let query = { _id: { $eq: elementId } };
        let resultElement = db.first(elementCollectionName, query);
        if(!resultElement) resolve(null);
        let fromObjElement = Element.fromObject(resultElement) 
        resolve(fromObjElement);
      }
      catch(err){
        reject(new DatabaseError());
      }
    });
  }   
  
  static getElementByPosition(position, spaceId){
    return new Promise((resolve, reject) => {
      try {
        let query = { 
          row: { $eq: position.row }, 
          column: { $eq: position.column }, 
          spaceId: { $eq: spaceId }
        };
        let resultElement = db.first(elementCollectionName, query);
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
        let resultUpdate = db.update(elementCollectionName, updateProperties, query);
        resolve(resultUpdate);
      }
      catch(err){
        reject(new DatabaseError());
      }
    });
  }   

  static deleteElementsByRowsAndColumns(rows, columns, type, spaceId){
    return new Promise((resolve, reject) => {
      try {
        let query = { 
          row: { $in: rows }, 
          column: { $in: columns }, 
          type: { $eq: type }, 
          spaceId: { $eq: spaceId }
        };
        let resultUpdate = db.delete(elementCollectionName, query);
        resolve(resultUpdate);
      }
      catch(err){
        reject(new DatabaseError());
      }
    });
  }   
}

module.exports = ElementsRepository;