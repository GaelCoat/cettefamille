var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  url:        { type: String },
  type:       { type: String, required: true },
  created:    { type: Date }
});

schema.pre('save', function (next) {

  // Si c'est une création, on initialise les dates
  if (!this.created) this.created = Date.now();

  next();
});

module.exports = mongoose.model('Picture', schema);

