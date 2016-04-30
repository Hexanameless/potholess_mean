var Vibration = require('../models/vibration');

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

exports.insertMultiple = function(req, res, next) {
  // pré-traitement sur les dates
  // on convertit les strings en objet Date
  for(var i=0 ; i<req.body.length ; i++) {
    var newDate = new Date(req.body[i].date);
    req.body[i].date = newDate;
  }

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
  var query = Vibration.find({});

  var valIsDefined = req.body.val !== undefined && req.body.val !== null;
  var datesAreDefined = req.body.minDate !== undefined && req.body.minDate !== null && req.body.maxDate !== undefined && req.body.maxDate !== null;

  if(valIsDefined && !datesAreDefined) {
    query = Vibration.find({}).where('val').gte(req.body.val);
  } else if(!valIsDefined && datesAreDefined) {
    query = Vibration.find({}).where('date').gte(req.body.minDate).lte(req.body.maxDate);
  } else if(valIsDefined && datesAreDefined) {
    query = Vibration.find({})
    .where('date').gte(req.body.minDate).lte(req.body.maxDate)
    .where('val').gte(req.body.val);
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
