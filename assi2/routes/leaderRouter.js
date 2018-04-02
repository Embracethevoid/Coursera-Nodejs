const express = require('express');
const http = require('http');
const bodyParser = require("body-parser")
// const bodyParser = require("body-parser")
const mongoose = require('mongoose');

const Leaders = require('../models/leaders');

const leaderRouter = express()

leaderRouter.use(bodyParser.json())

leaderRouter.route('/')
.all((req,res,next) => {
  // res.statusCode = 200;
  // res.setHeader('Content-Type','text/plain');
  next();
})

.get((req,res,next) => {
    Leaders.find({})
    .then((Leaders) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(Leaders);
    }, (err) => next(err))
    .catch((err) => next(err));
})

.post((req, res, next) => {
  console.log(req.body);
    Leaders.create(req.body)
    .then((leader) => {
        console.log('Promotion Created ', leader);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leader);
    }, (err) => next(err))
    .catch((err) => next(err));
})

.put((req,res,next) =>{
  res.statusCode = 403;
  res.end("PUT operation not supported on /Leaders");
})

.delete((req, res, next) => {
    Leaders.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});


leaderRouter.route("/:leaderID")
.all((req,res,next) => {
  // res.statusCode = 200;
  // res.setHeader('Content-Type','text/plain');
  next();
})

.get((req,res,next) => {
    Leaders.findById(req.params.leaderID)
    .then((leader) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leader);
    }, (err) => next(err))
    .catch((err) => next(err));
})

.post((req,res,next) => {
  res.end("POST operation not supported on /Leaders/");
})

.put((req, res, next) => {
    Leaders.findByIdAndUpdate(req.params.leaderID, {
        $set: req.body
    }, { new: true })
    .then((leader) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leader);
    }, (err) => next(err))
    .catch((err) => next(err))
  })
.delete((req, res, next) => {
  console.log(req.params.leaderID);
    Leaders.findByIdAndRemove(req.params.leaderID)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});



module.exports  = leaderRouter;
