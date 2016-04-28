var Contact = require('../models/contact');

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

exports.create = function(req, res, next) {
  var newContact = new Contact(req.body);

  newContact.save(function(err, doc) {
      if (err) {
          handleError(res, err.message, "Failed to create new contact.");
      } else {
          res.status(201).json(doc);
      }
  });
};

exports.listAll = function (req, res, next) {
  Contact.find({}, function(err, docs) {
        if (err) {
            handleError(res, err.message, "Failed to get contacts.");
        } else {
            res.status(200).json(docs);
        }
    });
};

exports.getById = function (req, res, next) {
  Contact.findById(req.params.id, function(err, doc) {
     if (err) {
       handleError(res, err.message, "Failed to get contact");
     } else {
       res.status(200).json(doc);
     }
   });
};

exports.remove = function(req, res, next) {
  Contact.findById(req.params.id).remove(function(err, result) {
     if (err) {
       handleError(res, err.message, "Failed to delete contact");
     } else {
       res.status(204).end();
     }
   });
};

exports.update = function (req, res, next) {
  Contact.findById(req.params.id).update(req.body, function(err, doc) {
     if (err) {
       handleError(res, err.message, "Failed to update contact");
     } else {
       res.status(204).end();
     }
   });
};
