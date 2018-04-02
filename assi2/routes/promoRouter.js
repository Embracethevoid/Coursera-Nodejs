const express = require('express');
const http = require('http');
const bodyParser = require("body-parser")
// const bodyParser = require("body-parser")
const mongoose = require('mongoose');

const Promotions = require('../models/promotions');

const promotionRouter = express()

promotionRouter.use(bodyParser.json())

promotionRouter.route('/')
.all((req,res,next) => {
  // res.statusCode = 200;
  // res.setHeader('Content-Type','text/plain');
  next();
})

.get((req,res,next) => {
    Promotions.find({})
    .then((promotions) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotions);
    }, (err) => next(err))
    .catch((err) => next(err));
})

.post((req, res, next) => {
  console.log(req.body);
    Promotions.create(req.body)
    .then((promotion) => {
        console.log('Promotion Created ', promotion);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotion);
    }, (err) => next(err))
    .catch((err) => next(err));
})

.put((req,res,next) =>{
  res.statusCode = 403;
  res.end("PUT operation not supported on /promotions");
})

.delete((req, res, next) => {
    Promotions.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});


promotionRouter.route("/:promotionID")
.all((req,res,next) => {
  // res.statusCode = 200;
  // res.setHeader('Content-Type','text/plain');
  next();
})

.get((req,res,next) => {
    Promotions.findById(req.params.promotionID)
    .then((promotion) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotion);
    }, (err) => next(err))
    .catch((err) => next(err));
})

.post((req,res,next) => {
  res.end("POST operation not supported on /promotions/");
})

.put((req, res, next) => {
    Promotions.findByIdAndUpdate(req.params.promotionID, {
        $set: req.body
    }, { new: true })
    .then((promotion) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotion);
    }, (err) => next(err))
    .catch((err) => next(err))
  })
.delete((req, res, next) => {
  console.log(req.params.promotionID);
    Promotions.findByIdAndRemove(req.params.promotionID)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});



module.exports  = promotionRouter;
