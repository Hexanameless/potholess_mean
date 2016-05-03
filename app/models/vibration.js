var mongoose =  require('mongoose');

var VibrationSchema = new mongoose.Schema({
    date: {type: Date, default: Date.now},
    lat: {type: Number, default: 0},
    lng: {type: Number, default: 0},
    val: {type: Number, default: 0},
    spd: {type: Number, default: 0}
  }, {
    collection: 'vibrations'
});

module.exports = mongoose.model('Vibration', VibrationSchema);
