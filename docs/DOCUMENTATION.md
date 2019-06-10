# Documentation

This is a API to support a simulations of "Robot against Dinosaur" in spaces with 250 position along 50 lines and 50 columns.

You can create Spaces, Robots e Dinosaurs. Only Robots can move forward or backward and turn left or right. Robots can too, attack Dinosaurs arround.

## Routes

METHOD | URL | BODY | RESULT
------------ | ------------- | ------------- | -------------
GET | {host}/spaces/new | - | [SpaceResponse](#spaceresponse)
GET | {host}/spaces/{spaceid} | - | [SpaceResponse](#spaceresponse)
POST | {host}/spaces/{spaceid}/robots | [RobotRequest](#robotrequest) | [RobotResponse](#robotresponse)


## Models

### Requests

#### RobotRequest

```javascript
{
  row: integer,
  column: integer,
  face: "right|left|top|bottom"
}
```
