# Documentation

This is a API to support a simulations of "Robot against Dinosaur" in spaces with 250 position along 50 lines and 50 columns.

You can create Spaces, Robots e Dinosaurs. Only Robots can move forward or backward and turn left or right. Robots can too, attack Dinosaurs arround.

## Routes

ACTION | METHOD | URL | Details
------------ | ------------- | ------------- | ------------- 
Create New Space | GET | {host}/spaces/new | [Space New Details](#spacesnew) 
Get Space | GET | {host}/spaces/{spaceid} | [Space Details](#spacesspaceid) 
Create New Robot | POST | {host}/spaces/{spaceid}/robots | [RobotRequest](#robotrequest) 
Turn Robot Left | PUT | {host}/spaces/{spaceid}/robots/{robotid}/turnleft | [RobotResponse](#robotresponsesuccess)
Turn Robot Right | PUT | {host}/spaces/{spaceid}/robots/{robotid}/turnright |  [RobotResponse](#robotresponsesuccess) 
Move Robot Forward | PUT | {host}/spaces/{spaceid}/robots/{robotid}/moveforward | [RobotResponse](#robotresponsesuccess)
Move Robot Backward | PUT | {host}/spaces/{spaceid}/robots/{robotid}/movebackward |  [RobotResponse](#robotresponsesuccess) 


## Routes details

### /spaces/new

Create new space

#### Responses
Code | RESULT 
------------ | -------------
200 | [SpaceResponseSuccess](#spaceresponsesuccess) 
404 | [SpaceNotFoundResponse](#spacenotfoundresponse)

### /spaces/{spaceid}

Create space by id

#### Responses
Code | RESULT 
------------ | -------------
200 | [SpaceResponseSuccess](#spaceresponsesuccess) 
404 | [SpaceNotFoundResponse](#spacenotfoundresponse)

### /spaces/{spaceid}/robots

Create new robot

#### Responses
Code | RESULT 
------------ | -------------
200 | [SpaceResponseSuccess](#spaceresponsesuccess) 
404 | [SpaceNotFoundResponse](#spacenotfoundresponse)



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
