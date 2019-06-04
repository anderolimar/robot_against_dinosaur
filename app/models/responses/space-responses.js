class SpaceNotFoundResponse {
  constructor(spaceId){
    this.status = 404;
    this.content = {
      code: "SPACE_ID_NOT_FOUND",
      message: `Space with id (${spaceId}) not found.`
    }
  }
}

module.exports = {
  SpaceNotFoundResponse
}