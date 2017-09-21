var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  name:        { type: String, required: true },
  phone:       { type: Number, required: true },
  message:     { type: String, required: true },
  seen:        { type: Boolean, default: false },
  created:     { type: Date }
});

schema.pre('save', function (next) {

  // Si c'est une création, on initialise les dates
  if (!this.created) this.created = Date.now();

  next();
});

module.exports = mongoose.model('Message', schema);

