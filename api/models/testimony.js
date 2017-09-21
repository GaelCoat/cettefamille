var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  picture:    { type: mongoose.Schema.Types.ObjectId, ref: 'Picture' },
  content:    { type: String, required: true },
  location:   { type: String, required: true },
  name:       { type: String, required: true },
  created:    { type: Date }
});

schema.pre('save', function (next) {

  // Si c'est une création, on initialise les dates
  if (!this.created) this.created = Date.now();

  next();
});

module.exports = mongoose.model('Testimony', schema);

