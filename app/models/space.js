class Space {
    constructor({ _id, lines, columns, filled }) {
        this._id = _id || null;
        this.lines =  lines || new Range(1, 50);
        this.columns = columns || new Range(1, 50);
        this.filled = filled || []; 
    }
    
    toObject() {
        let obj = Object.assign({}, this)
        obj.lines = Object.assign({}, obj.lines )
        obj.columns = Object.assign({}, obj.columns )
        return obj;
    }
    
    static fromObject(obj){
        let space = new Space({});
        space._id = obj._id;
        space.lines = new Range(obj.lines);
        space.columns = new Range(obj.columns);
        space.filled = obj.filled;
        return space
    }
}

class Range {
    constructor({ start, end }) {
        this.start = start;
        this.end = end;
    }
}

module.exports = Space;