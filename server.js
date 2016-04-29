var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

// *** routes *** //
var routes = require('./app/routes/routes.js');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/local');

var app = express();
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

// *** main routes *** //
app.use(routes);


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!

  // Initialize the app.
  var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });

});

