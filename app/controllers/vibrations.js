var Vibration = require('../models/vibration');

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

exports.insertMultiple = function(req, res, next) {
  Vibration.collection.insert(req.body, function(err, doc) {
      if (err) {
          handleError(res, err.message, "Failed to create new vibration.");
      } else {
          res.status(201).json(doc);
      }
  });
};

exports.getAllVibrations = function (req, res, next) {
  Vibration.find({}, function(err, docs) {
        if (err) {
            handleError(res, err.message, "Failed to get vibrations.");
        } else {
            res.status(200).json(docs);
        }
    });
};

exports.getAllVibrationsFromQuery = function(req, res, next) {
  console.log("SERVER getAllFromQuery",req.body);

  var query = Vibration.find({});
  
  if(req.body.val !== undefined && req.body.val !== null) {
    query = Vibration.find({}).where('val').gte(req.body.val);
  }

  query.exec( function(err, docs) {
        if (err) {
            handleError(res, err.message, "Failed to get vibrations.");
        } else {
            res.status(201).json(docs);
        }
    });
};

exports.deleteAll = function(req, res, next) {
  Vibration.find({}).remove(function(err, result) {
     if (err) {
       handleError(res, err.message, "Failed to delete vibrations");
     } else {
       res.status(204).end();
     }
   });
};
