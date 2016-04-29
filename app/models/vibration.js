var mongoose =  require('mongoose');

var VibrationSchema = new mongoose.Schema({
    date: Date,
    lat: Number,
    lng: Number,
    val: Number
  }, {
    collection: 'vibrations'
});

module.exports = mongoose.model('Vibration', VibrationSchema);
