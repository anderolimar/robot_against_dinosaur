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

module.exports = Operators;