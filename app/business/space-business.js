
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
		} else {
			throw `Invalid collection ${collectionName}`;
		}
	}
	
	select(collectionName, whereClause, first){
	    if (!this.hasCollection(collectionName)) throw `Invalid collection ${collectionName}`;
	    let firstRes = first || Object.keys(whereClause).includes("_id");
	    let result = [];
	    for(let data of this.data[collectionName]){
			console.dir(data)
	        let positive = new QueryCompare(data, whereClause).compare();
	        if(positive) result.push(data);
	        if(firstRes) return result; 
		}
		return result;
	}
	
	first(collectionName, whereClause){
	    return this.select(collectionName, whereClause, true)[0];
	}
	
	update(collectionName, updateValues, whereClause){
	    if (!this.hasCollection(collectionName)) throw `Invalid collection ${collectionName}`;
	    let first = Object.keys(updateValues).includes("_id");
	    for(let idx in this.data[collectionName]){
	        let data = this.data[collectionName][idx]
	        let positive = new QueryCompare(data, whereClause).compare();
	        if(positive) this.data[collectionName][idx] = Object.assign(data, updateValues)
	        if(first) return true;
		}
		return true;
	}
	
	delete(collectionName, whereClause){
	    if (!this.hasCollection(collectionName)) throw `Invalid collection ${collectionName}`;
	    let first = Object.keys(updateValues).includes("_id");
	    for(let idx in this.data[collectionName]){
	        let data = this.data[collectionName][idx]
	        let positive = new QueryCompare(data, whereClause).compare();
	        if(positive) this.data[collectionName].splice(idx, 1)
	        if(first) return true;
		}
		return true;
	}	
	
}

class QueryCompare {
    constructor(ref, where) {
        this.ref = ref;
        this.where = where
    }
    
    compare() {
        for(let key of Object.keys(this.where)) {
            let whereProp = this.where[key];
            let refValue = this.ref[key];
            let positive = false;
            for(let k of Object.keys(whereProp)){
                positive = Operators[k](whereProp[k], refValue);
                if(positive) break;
            }
            if(!positive) return false;
        }
        return true;
    }
}

const Operators = {
    "$eq" : (ref, value) => {
        return ref == value;
    },
    "$lt" : (ref, value) => {
        return ref < value;
    },
    "$le" : (ref, value) => {
        return ref <= value;
    },    
    "$gt" : (ref, value) => {
        return ref > value;
    },    
    "$ge" : (ref, value) => {
        return ref >= value;
    },
    "$ne" : (ref, value) => {
        return ref != value;
    }    
}