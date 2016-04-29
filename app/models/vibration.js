var mongoose =  require('mongoose');

var VibrationSchema = new mongoose.Schema({
    date: Number,
    lat: Number,
    lng: Number,
    val: Number
  }, {
    collection: 'vibrations'
});

module.exports = mongoose.model('Vibration', VibrationSchema);
