class DatabaseError {
  constructor(){
    this.message = `Database not responded correctly.`;
  }
}

module.exports = {
  DatabaseError
}