const WhereCompare = require("./where-compare");

class InMemoryDB {
    
	constructor(){
		this.data = {};
	}
	
    static instance = new InMemoryDB();	
	
	createCollection(collectionName){
		if (!this.hasCollection(collectionName)) {
			this.data[collectionName] = [];
		}
	}
	
	hasCollection(collectionName){
		for(let key of Object.keys(this.data)){
			if(key == collectionName) return true;
		}
		return false;		
	}
	
	insert(collectionName, data) {
		if (this.hasCollection(collectionName)) {
			let id = (this.data[collectionName].length + 1)
			let reg = Object.assign(data, { _id: id });
			this.data[collectionName].push(reg);
    			return reg
		} else {
			throw `Invalid collection ${collectionName}`;
		}
	}
	
	select(collectionName, whereClause, first){
	    if (!this.hasCollection(collectionName)) throw `Invalid collection ${collectionName}`;
	    let firstRes = first || Object.keys(whereClause).includes("_id");
	    let result = [];
	    for(let data of this.data[collectionName]){
	        let positive = new WhereCompare(data, whereClause).compare();
	        if(positive) { 
				result.push(data);
				if(firstRes) return result; 
			}
		}
		return result;
	}
	
	first(collectionName, whereClause){
	    return this.select(collectionName, whereClause, true)[0];
	}
	
	update(collectionName, updateValues, whereClause){
	    if (!this.hasCollection(collectionName)) throw `Invalid collection ${collectionName}`;
	    let first = Object.keys(whereClause).includes("_id");
	    delete updateValues["_id"];
	    for(let idx in this.data[collectionName]){
	        let data = this.data[collectionName][idx]
	        let positive = new WhereCompare(data, whereClause).compare();
	        if(positive) this.data[collectionName][idx] = Object.assign(data, updateValues)
	        if(first) return true;
		}
		return true;
	}
	
	delete(collectionName, whereClause){
	    if (!this.hasCollection(collectionName)) throw `Invalid collection ${collectionName}`;
	    let first = Object.keys(whereClause).includes("_id");
	    for(let idx in this.data[collectionName]){
	        let data = this.data[collectionName][idx]
	        let positive = new WhereCompare(data, whereClause).compare();
	        if(positive) this.data[collectionName].splice(idx, 1)
	        if(first) return true;
		}
		return true;
	}	
}

module.exports = InMemoryDB;



