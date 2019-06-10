# Documentation

This is a API to support a simulations of "Robot against Dinosaur" in spaces with 250 position along 50 lines and 50 columns.

You can create Spaces, Robots e Dinosaurs. Only Robots can move forward or backward and turn left or right. Robots can too, attack Dinosaurs arround.

## Routes

METHOD | URL | Responses
------------ | ------------- | ------------- 
GET | {host}/spaces/new | [Space New Responses](#spacesnew) 
GET | {host}/spaces/{spaceid} | [SpaceResponseSuccess](#spaceresponsesuccess) 
POST | {host}/spaces/{spaceid}/robots | [RobotRequest](#robotrequest) 
PUT | {host}/spaces/{spaceid}/robots/{robotid}/turnleft | [RobotResponse](#robotresponsesuccess)
PUT | {host}/spaces/{spaceid}/robots/{robotid}/turnright |  [RobotResponse](#robotresponsesuccess) 
PUT | {host}/spaces/{spaceid}/robots/{robotid}/moveforward | [RobotResponse](#robotresponsesuccess)
PUT | {host}/spaces/{spaceid}/robots/{robotid}/movebackward |  [RobotResponse](#robotresponsesuccess) 


## Routes details

### /spaces/new

Code | RESULT 
------------ | -------------
200 | [SpaceResponseSuccess](#spaceresponsesuccess) 


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
### Responses

#### SpaceResponseSuccess

```javascript
{
  _id: integer
  rows: { start: integer, end: integer },
  columns:  { start: integer, end: integer },
  filled: array (Robot|Dinosaur)
}
```
#### SpaceNotFoundResponse

```javascript
{
  code: "SPACE_NOT_FOUND"
  message: string
}
```
