var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  picture:    { type: String },
  text:       { type: String, required: true },
  legend:     { type: Number, required: true },
  created:    { type: Date }
});

schema.pre('save', function (next) {

  // Si c'est une création, on initialise les dates
  if (!this.created) this.created = Date.now();

  next();
});

module.exports = mongoose.model('Testimony', schema);

