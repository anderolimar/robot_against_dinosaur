class Space {
  constructor(args) {
      let currArgs = args || {}; 
      this._id = currArgs._id || null;
      this.lines =  currArgs.lines || new Range({start:1, end: 50});
      this.columns = currArgs.columns || new Range({start:1, end: 50});
      this.filled = currArgs.filled || []; 
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
  constructor(args) {
    let currArgs = args || {};   
    this.start = currArgs.start;
    this.end = currArgs.end;
  }
}

module.exports = Space;