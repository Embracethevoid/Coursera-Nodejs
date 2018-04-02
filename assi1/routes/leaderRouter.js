const express = require('express');
const http = require('http');
const bodyParser = require("body-parser")
// const bodyParser = require("body-parser")

const leaderRouter = express()

leaderRouter.use(bodyParser.json())

leaderRouter.route('/')
.all((req,res,next) => {
  res.statusCode = 200;
  res.setHeader('Content-Type','text/plain');
  next();
})

.get((req,res,next) => {
  res.end('will send all the leaders to you');
})

.post((req,res,next) => {
  res.end("Will add the leader: "+ req.body.name +
          "with details: "+ req.body.description);
})

.put((req,res,next) =>{
  res.statusCode = 403;
  res.end("PUT operation not supported on /leaders");
})

.delete((req,res,next) => {
  res.end("Deleting all the leaders!");
});


leaderRouter.route("/:leaderID")
.all((req,res,next) => {
  res.statusCode = 200;
  res.setHeader('Content-Type','text/plain');
  next();
})

.get((req,res,next) => {
  res.end("will send the leader "+ req.params.leaderID+" to you");
})

.post((req,res,next) => {
  res.end("POST operation not supported on /leaders/");
})

.put((req,res,next) =>{
  res.statusCode = 403;
  res.write("Updating the leader: "+ req.params.leaderID +"\n");
  res.end("Will update the leader: "+req.body.name +
        "with details: "+ req.body.description);
})

.delete((req,res,next) => {
  res.end("Deleting leader: "+req.params.leaderID);
});


module.exports  = leaderRouter;
