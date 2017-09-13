var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  processed:  { type: Boolean, default: false },
  by:         [ { type: mongoose.Schema.Types.ObjectId, ref: 'User' } ],
  state:      { type:String, enum:[ 'idling', 'pending', 'done' ], default:'idling' },
  when:       { type: Date }
});



module.exports = mongoose.model('Process', schema);

