const http = require("http");
const fs = require("fs");
const  path = require("path");
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser")
const hostname = "localhost";
const port = 3000;


const dishRouter = require("./routes/dishRouter");
const leaderRouter = require("./routes/leaderRouter");
const promotionRouter = require("./routes/promoRouter");
const mongoose = require('mongoose');
const app = express();
app.use(morgan("dev"));
app.use(bodyParser.json())
app.use("/dishes",dishRouter)
app.use("/leaders",leaderRouter)
app.use("/promotions",promotionRouter)
app.use(express.static(__dirname+"/public"));

const server = http.createServer(app);


server.listen(port,hostname,() => {
  console.log('Server running at http://%s:%d',hostname,port);
});
