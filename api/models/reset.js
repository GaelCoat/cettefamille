var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  user:        { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  created:     { type: Date }
});

schema.pre('save', function (next) {

  // Si c'est une création, on initialise les dates
  if (!this.created) this.created = Date.now();

  next();
});

module.exports = mongoose.model('Reset', schema);

