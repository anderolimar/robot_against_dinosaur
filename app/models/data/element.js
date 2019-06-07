class Element {
  constructor(args) {
    let currArgs = args || {}; 
    this._id = currArgs._id ;
    this.row =  currArgs.row;
    this.column = currArgs.column ;
    this.type = currArgs.type;
    this.face = currArgs.face;
    this.spaceId = currArgs.spaceId;
  }
  
  toObject() {
    let obj = Object.assign({}, this)
    return obj;
  }
  
  static fromObject(obj){
    let element = new Element(obj);
    return element
  }
}

Element.Types = {
  ROBOT: "robot",
  DINOSAUR: "dinosaur"
}

Element.Faces = {
  RIGHT: "right",
  LEFT: "left",
  TOP: "top",
  BOTTOM: "bottom"
}

module.exports = Element;