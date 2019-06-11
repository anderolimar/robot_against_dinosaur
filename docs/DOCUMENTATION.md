# Documentation

This is a API to support a simulations of "Robot against Dinosaur" in spaces with 250 position along 50 lines and 50 columns.

You can create Spaces, Robots e Dinosaurs. Only Robots can move forward or backward and turn left or right. Robots can too, attack Dinosaurs arround.

## Routes

ACTION | METHOD | URL | Details
------------ | ------------- | ------------- | ------------- 
Create New Space | GET | {host}/spaces/new | [Space New Details](#spacesnew) 
Get Space | GET | {host}/spaces/{spaceid} | [Space Details](#spacesspaceid) 
Create New Robot | POST | {host}/spaces/{spaceid}/robots | [Robot New Details](#spacesspaceidrobots) 
Turn Robot Left | PUT | {host}/spaces/{spaceid}/robots/{robotid}/turnleft | [Robot Turn Left Details](#spacesspaceidrobotsrobotidturnleft)
Turn Robot Right | PUT | {host}/spaces/{spaceid}/robots/{robotid}/turnright |  [Robot Turn Right Details](#spacesspaceidrobotsrobotidturnright) 
Move Robot Forward | PUT | {host}/spaces/{spaceid}/robots/{robotid}/moveforward | [Robot Move Forward Details](#spacesspaceidrobotsrobotidmoveforward)
Move Robot Backward | PUT | {host}/spaces/{spaceid}/robots/{robotid}/movebackward |  [Robot Move Backward Details](#spacesspaceidrobotsrobotidmovebackward) 
Create New Dinosaur | POST | {host}/spaces/{spaceid}/dinosaurs | [Dinosaur New Details](#spacesspaceiddinosaurs) 

---

## Routes details

### /spaces/new

> Create new space

#### Request

Method | Body 
------------ | -------------
GET | -

#### Responses
Http Code | Result
------------ | -------------
200 | [SpaceResponseSuccess](#spaceresponsesuccess) 

### /spaces/{spaceid}

> Create space by id

#### Request

Method | Body 
------------ | -------------
GET | -

#### Responses
Http Code | Result 
------------ | -------------
200 | [SpaceResponseSuccess](#spaceresponsesuccess) 
400 | [InvalidSpaceIdResponse](#invalidspaceidresponse)
404 | [SpaceNotFoundResponse](#spacenotfoundresponse)

### /spaces/{spaceid}/robots

> Create new robot

#### Request

Method | Body 
------------ | -------------
POST | [RobotRequest](#robotrequest) 

#### Responses
Http Code | Result 
------------ | -------------
200 | [RobotResponseSuccess](#robotresponsesuccess) 
400 | [InvalidSpaceIdResponse](#invalidspaceidresponse)
400 | [InvalidRowResponse](#invalidiowiesponse)
400 | [InvalidColumnResponse](#invalidiolumnresponse)
400 | [InvalidFaceResponse](#invalidiolumnresponse)
400 | [OutOfSpaceRangeResponse](#outofspacerangeresponse)
404 | [SpaceNotFoundResponse](#spacenotfoundresponse)
409 | [AlreadyFilledPositionResponse](#alreadyfilledpositionresponse)

### /spaces/{spaceid}/robots/{robotid}/turnleft

> Turn robot face to left

#### Request

Method | Body 
------------ | -------------
PUT | -

#### Responses
Http Code | Result 
------------ | -------------
200 | [SuccessResponse](#successresponse) 
400 | [InvalidSpaceIdResponse](#invalidspaceidresponse)
400 | [InvalidRobotIdResponse](#invalidrobotidresponse)
404 | [SpaceNotFoundResponse](#spacenotfoundresponse)
404 | [RobotNotFoundResponse](#robotnotfoundresponse)

### /spaces/{spaceid}/robots/{robotid}/turnright

> Turn robot face to right

#### Request

Method | Body 
------------ | -------------
PUT | -

#### Responses
Http Code | Result 
------------ | -------------
200 | [SuccessResponse](#successresponse) 
400 | [InvalidSpaceIdResponse](#invalidspaceidresponse)
400 | [InvalidRobotIdResponse](#invalidrobotidresponse)
404 | [SpaceNotFoundResponse](#spacenotfoundresponse)
404 | [RobotNotFoundResponse](#robotnotfoundresponse)

### /spaces/{spaceid}/robots/{robotid}/moveforward

> Move robot forward

#### Request

Method | Body 
------------ | -------------
PUT | -

#### Responses
Http Code | Result 
------------ | -------------
200 | [SuccessResponse](#successresponse) 
400 | [InvalidSpaceIdResponse](#invalidspaceidresponse)
400 | [InvalidRobotIdResponse](#invalidrobotidresponse)
400 | [OutOfSpaceRangeResponse](#outofspacerangeresponse)
404 | [SpaceNotFoundResponse](#spacenotfoundresponse)
404 | [RobotNotFoundResponse](#robotnotfoundresponse)
409 | [AlreadyFilledPositionResponse](#alreadyfilledpositionresponse)

### /spaces/{spaceid}/robots/{robotid}/movebackward

> Move robot backward

#### Request

Method | Body 
------------ | -------------
PUT | -

#### Responses
Http Code | Result 
------------ | -------------
200 | [SuccessResponse](#successresponse) 
400 | [InvalidSpaceIdResponse](#invalidspaceidresponse)
400 | [InvalidRobotIdResponse](#invalidrobotidresponse)
400 | [OutOfSpaceRangeResponse](#outofspacerangeresponse)
404 | [SpaceNotFoundResponse](#spacenotfoundresponse)
404 | [RobotNotFoundResponse](#robotnotfoundresponse)
409 | [AlreadyFilledPositionResponse](#alreadyfilledpositionresponse)

### /spaces/{spaceid}/robots/{robotid}/attack

> Robot executes attack

#### Request

Method | Body 
------------ | -------------
PUT | -

#### Responses
Http Code | Result 
------------ | -------------
200 | [SuccessResponse](#successresponse) 
400 | [InvalidSpaceIdResponse](#invalidspaceidresponse)
400 | [InvalidRobotIdResponse](#invalidrobotidresponse)
404 | [SpaceNotFoundResponse](#spacenotfoundresponse)
404 | [RobotNotFoundResponse](#robotnotfoundresponse)

### /spaces/{spaceid}/dinosaurs

> Create new dinosaur

#### Request

Method | Body 
------------ | -------------
POST | [DinosaurRequest](#dinosaurrequest) 

#### Responses
Http Code | Result 
------------ | -------------
200 | [DinosaurResponseSuccess](#dinosaurresponsesuccess) 
400 | [InvalidSpaceIdResponse](#invalidspaceidresponse)
400 | [InvalidRowResponse](#invalidiowiesponse)
400 | [InvalidColumnResponse](#invalidiolumnresponse)
400 | [OutOfSpaceRangeResponse](#outofspacerangeresponse)
404 | [SpaceNotFoundResponse](#spacenotfoundresponse)
409 | [AlreadyFilledPositionResponse](#alreadyfilledpositionresponse)

---

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

#### DinosaurRequest

```javascript
{
  row: integer,
  column: integer
}
```
### Success Responses

#### SpaceResponseSuccess

```javascript
{
  _id: integer
  rows: { start: integer, end: integer },
  columns:  { start: integer, end: integer },
  filled: array (Robot|Dinosaur)
}
```

#### RobotResponseSuccess

```javascript
{
  _id: integer
  row: integer,
  column:  integer,
  face: "right|left|top|bottom",
  type: "robot",
  spaceId: integer
}
```

#### DinosaurResponseSuccess

```javascript
{
  _id: integer
  row: integer,
  column:  integer,
  type: "dinosaur",
  spaceId: integer
}
```

#### SuccessResponse

```javascript
{
  success: true
} 
```

### Error Responses

#### SpaceNotFoundResponse

```javascript
{
  code: "SPACE_NOT_FOUND"
  message: string
}
```

#### InvalidSpaceIdResponse

```javascript
{
  code: "INVALID_SPACE_ID_VALUE"
  message: string
}
```

#### InvalidRobotIdResponse

```javascript
{
  code: "ROBOT_NOT_FOUND"
  message: string
}
```

#### RobotNotFoundResponse

```javascript
{
  code: "INVALID_ROBOT_ID_VALUE"
  message: string
}
```

#### InvalidRowResponse

```javascript
{
  code: "INVALID_ROW_VALUE"
  message: string
}
```

#### InvalidColumnResponse

```javascript
{
  code: "INVALID_COLUMN_VALUE"
  message: string
}
```

#### InvalidFaceResponse

```javascript
{
  code: "INVALID_FACE_VALUE"
  message: string
}
```

#### AlreadyFilledPositionResponse

```javascript
{
  code: "ALREADY_FILLED_POSITION"
  message: string
}
```

#### OutOfSpaceRangeResponse

```javascript
{
  code: "OUT_OF_SPACE_RANGE"
  message: string
}
```