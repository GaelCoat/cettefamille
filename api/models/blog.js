var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  title:       { type: String, required: true },
  description: { type: String, required: true },
  content:     { type: Object, required: true },
  picture:     { type: mongoose.Schema.Types.ObjectId, ref: 'Picture' },
  images:      { type: Array },
  created:     { type: Date }
});

schema.pre('save', function (next) {

  // Si c'est une création, on initialise les dates
  if (!this.created) this.created = Date.now();

  next();
});

module.exports = mongoose.model('Blog', schema);

