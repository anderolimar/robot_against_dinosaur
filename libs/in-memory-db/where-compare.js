const Operators = require("./operators");

class WhereCompare {
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
                positive = Operators[k](refValue, whereProp[k]);
                if(positive) break;
            }
            if(!positive) return false;
        }
        return true;
    }
}

module.exports = WhereCompare;
