const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();
const cors = require('cors');

const meetupRoutes = require("./routes/meetup-routes");
const attendeeRoutes = require("./routes/attendee-routes");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//CORS middleware
app.use(cors({
  origin: '*'
}));

// DB Config
const mongoURI = process.env.mongoURI;
const dbName = process.env.dbName;
function mongoConnectError(err) {
  console.log('MongoDB connection encountered an error :(');
  console.log(err);
}
function mongoConnectFail() {
  console.log('MongoDB failed to connected :(');
}
function mongoConnectSuccess() {
  console.log('MongoDB has connected successfully!');
}
mongoose
  .connect(mongoURI, {dbName, useNewUrlParser: true})
  .then(mongoConnectSuccess, mongoConnectFail)
  .catch(mongoConnectError);

// Enable CORS without external module
app.options(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Routes
app.use("/api/meetups", meetupRoutes);
app.use("/api/attendees", attendeeRoutes);

const port = 8081;
app.listen(port, () => {
  console.log(`Server up and running on port ${port}!`);
});
