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

exports.getVibrationsFromDate = function(req, res, next) {
  var query = Vibration.find({});

  var valIsDefined = req.params.val !== undefined && req.params.val !== null;
  var datesAreDefined = (req.params.minDate !== undefined || req.params.minDate !== null) && (req.params.maxDate !== undefined || req.params.maxDate !== null);

  if(valIsDefined && !datesAreDefined) {
    query = Vibration.find({}).where('val').gte(req.params.val);
  } else if(!valIsDefined && datesAreDefined) {
    query = Vibration.find({}).where('date').gte(req.params.minDate).lte(req.params.maxDate);
  } else if(valIsDefined && datesAreDefined) {
    query = Vibration.find({})
    .where('date').gte(req.params.minDate).lte(req.params.maxDate)
    .where('val').gte(req.params.val);
  }
  query.exec( function(err, docs) {
        if (err) {
            handleError(res, err.message, "Failed to get vibrations.");
        } else {
            res.status(201).json(docs);
        }
    });
};

exports.getVibrationsFromVal = function(req, res, next) {
  var query = Vibration.find({});

  var valIsDefined = req.params.val !== undefined && req.params.val !== null;

  if(valIsDefined) {
    query = Vibration.find({}).where('val').gte(req.params.val);
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
