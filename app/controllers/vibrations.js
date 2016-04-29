var Vibration = require('../models/vibration');

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

exports.create = function(req, res, next) {
    newVibration.save(function(err, doc) {
        if (err) {
            handleError(res, err.message, "Failed to create new vibration.");
        } else {
            res.status(201).json(doc);
        }
    });
};

exports.createMultiple = function(req, res, next) {

  console.log(req.body);
  var nb_vibrations = Object.keys(req.body).length;
  console.log(nb_vibrations);

  for(var i=0 ; i<nb_vibrations ; i++) {
    console.log("vibration "+i,req.body[i]);
    create(req.body[i]);
  }
};

exports.listAll = function (req, res, next) {
  Vibration.find({}, function(err, docs) {
        if (err) {
            handleError(res, err.message, "Failed to get vibrations.");
        } else {
            res.status(200).json(docs);
        }
    });
};

exports.removeAll = function(req, res, next) {
  Vibration.find({}).remove(function(err, result) {
     if (err) {
       handleError(res, err.message, "Failed to delete vibrations");
     } else {
       res.status(204).end();
     }
   });
};
