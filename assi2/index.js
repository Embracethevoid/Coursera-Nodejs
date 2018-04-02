const http = require("http");
const fs = require("fs");
const path = require("path");
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser")
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
const mongoose = require("mongoose");
mongoose.Promise = require("bluebird");

const Dishes = require("./models/dishes");
const Promotions = require("./models/promotions");
const hostname = "localhost";
const port = 3000;
const url = "mongodb://localhost:27017/conFusion"
// MongoClient.connect(url,(err,db) =>{
//   assert.equal(err,null);
//   console.log("Connected correctly to server");
//
//   const collection = db.collection("dishes");
//   collection.insertOne({"name":"Uthappizza","description":"test"},
//   (err,result) =>{
//     assert.equal(err,null);
//     console.log("After Insert:\n")
//     console.log(result.ops);
//     collection.find({}).toArray((err,docs) => {
//       assert.equal(err,null);
//
//       console.log("Found: \n");
//       console.log(docs);
//
//       db.dropCollection("dishes",(err,result) => {
//         assert.equal(err,null);
//
//         db.close();
//       });
//     });
//   })
// })
const connect = mongoose.connect(url,{
  useMongoClient:true
});

connect.then((db) => {
  console.log("Connected correctly to server");
  // Dishes.create({
  //   name:"Athappizza",
  //   description:"test"
  // }).then((dish) => {
  //   console.log(dish);
  //   Dishes.find({}).exec();
  // }).then((dishes) => {
  //   return db.collection("dishes").drop();
  // }).then(() => {
  //   return db.close()
  // }).
  // catch(err => console.log(err))
})
//
// const dishRouter = require("./routes/dishRouter");
const leaderRouter = require("./routes/leaderRouter");
const promotionRouter = require("./routes/promoRouter");
// const dboper = require("./operations");
// // const mongoose = require('mongoose');
// MongoClient.connect(url)
// .then((db) =>{
//   console.log("Connected correctly to server");
//   return dboper.insertDocument(db,{name:"Vadonut",description:"test"},"dishes")
// .then((result) => {
//   console.log("Insert Document:\n",result.ops);
//   return dboper.findDocument(db,"dishes")
// })
// .then((docs) => {
//   console.log("Found Documents:\n",docs);
//   return dboper.updateDocument(db,{name:"Vadonut"},{description:"Updated Test"},"dishes")
// })
// .then((result) => {
//   console.log("Updated Document:\n",result.result);
//   return dboper.findDocument(db,"dishes")
// })
// .then((docs) => {
//   console.log("Found Updated Documents:\n",docs);
//         // dboper.removeDocument(db,"dishes",(result) =>{
//           //   console.log("Dropped Collection:\n",result.result)
//           // })
//   return db.dropCollection("dishes")
// })
// .then((result) => {
//   console.log("Dropped Collection:",result);
//   db.close()
// })
// .catch(err => console.log(err))
// })
// .catch(err => console.log(err));
const app = express();
app.use(morgan("dev"));
app.use(bodyParser.json())
// app.use("/dishes",dishRouter)
app.use("/leaders",leaderRouter)
app.use("/promotions",promotionRouter)
app.use(express.static(__dirname+"/public"));
//
const server = http.createServer(app);
//
//
server.listen(port,hostname,() => {
  console.log('Server running at http://%s:%d',hostname,port);
});
