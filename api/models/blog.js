var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  title:       { type: String, required: true },
  content:     { type: String, required: true },
  created:    { type: Date }
});

schema.pre('save', function (next) {

  // Si c'est une création, on initialise les dates
  if (!this.created) this.created = Date.now();

  next();
});

module.exports = mongoose.model('Blog', schema);

