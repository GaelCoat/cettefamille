var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  mail:       { type: String, required: true },
  name:       { type: String, required: true },
  phone:      { type: Number, required: true },
  code:       { type: Number, required: true },
  process:    [ { type: mongoose.Schema.Types.ObjectId, ref: 'Process' } ],
  created:    { type: Date }
});

schema.pre('save', function (next) {

  // Si c'est une création, on initialise les dates
  if (!this.created) this.created = Date.now();

  next();
});

module.exports = mongoose.model('Family', schema);

