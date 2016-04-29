var mongoose =  require('mongoose');

var ContactSchema = new mongoose.Schema({
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true},
    phone: {
		mobile: String,
		work: String
    },
    address: String,
    twitter: String
  }, {
    collection: 'contacts'
});

module.exports = mongoose.model('Contact', ContactSchema);
