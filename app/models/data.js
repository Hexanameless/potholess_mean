var mongoose =  require('mongoose');

var DataSchema = new mongoose.Schema({
    latitude: Number,
    longitude: Number,
    magnitude: Number
  }, {
    collection: 'datas'
});

module.exports = mongoose.model('Data', DataSchema);
