const express = require('express');
const http = require('http');
const bodyParser = require("body-parser")
// const bodyParser = require("body-parser")

const promotionRouter = express()

promotionRouter.use(bodyParser.json())

promotionRouter.route('/')
.all((req,res,next) => {
  res.statusCode = 200;
  res.setHeader('Content-Type','text/plain');
  next();
})

.get((req,res,next) => {
  res.end('will send all the promotions to you');
})

.post((req,res,next) => {
  res.end("Will add the promotion: "+ req.body.name +
          "with details: "+ req.body.description);
})

.put((req,res,next) =>{
  res.statusCode = 403;
  res.end("PUT operation not supported on /promotions");
})

.delete((req,res,next) => {
  res.end("Deleting all the promotions!");
});


promotionRouter.route("/:promotionID")
.all((req,res,next) => {
  res.statusCode = 200;
  res.setHeader('Content-Type','text/plain');
  next();
})

.get((req,res,next) => {
  res.end("will send the promotion "+ req.params.promotionID+" to you");
})

.post((req,res,next) => {
  res.end("POST operation not supported on /promotions/");
})

.put((req,res,next) =>{
  res.statusCode = 403;
  res.write("Updating the promotion: "+ req.params.promotionID +"\n");
  res.end("Will update the promotion: "+req.body.name +
        "with details: "+ req.body.description);
})

.delete((req,res,next) => {
  res.end("Deleting promotion: "+req.params.promotionID);
});


module.exports  = promotionRouter;
