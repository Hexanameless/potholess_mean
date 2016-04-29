var Data = require('../models/data');

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

exports.create = function(req, res, next) {
  var newData = new Data(req.body);

  newData.save(function(err, doc) {
      if (err) {
          handleError(res, err.message, "Failed to create new data.");
      } else {
          res.status(201).json(doc);
      }
  });
};

exports.listAll = function (req, res, next) {
  Data.find({}, function(err, docs) {
        if (err) {
            handleError(res, err.message, "Failed to get datas.");
        } else {
            res.status(200).json(docs);
        }
    });
};

exports.removeAll = function(req, res, next) {
  Data.find({}).remove(function(err, result) {
     if (err) {
       handleError(res, err.message, "Failed to delete datas");
     } else {
       res.status(204).end();
     }
   });
};
