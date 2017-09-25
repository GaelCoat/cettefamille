var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var q = require('q');
var salt = 10;

var schema = new mongoose.Schema({
  mail:       { type: String, required: true, index: { unique: true } },
  username:   { type: String, required: true, index: { unique: true } },
  password:   { type: String, required: true },
  created:    { type: Date, default: Date.now() }
});

schema.pre('save', function(next) {

  var user = this;

  if (!this.created) this.created = Date.now();

  // generate a salt
  bcrypt.genSalt(salt, function(err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err);

      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

schema.statics.definePassword = function(id, pwd) {

  var that = this;
  var defer = q.defer();

  bcrypt.genSalt(salt, function(err, salt) {

    if (err) defer.reject(err)

    // hash the password using our new salt
    bcrypt.hash(pwd, salt, function(err, hash) {

      if (err) defer.reject(err)
      defer.resolve(that.findOneAndUpdate({_id: id}, {password: hash}).exec());
    });
  });

  return defer.promise;
};

schema.methods.comparePassword = function(candidatePassword) {

  return bcrypt.compare(candidatePassword, this.password);
};


module.exports = mongoose.model('User', schema);

