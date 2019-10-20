const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const User = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

User.pre('save', function (next) {
  const user = this;
  if (!user.isModified('password')) return next();
  bcrypt.hash(user.password, 10, (err, hash) => {
      if (err) return next(err);
      user.password = hash;
      next();
  });
});

User.methods.checkPassword = function (password, callback) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
      if (err) return callback(err);
      callback(null, isMatch);
  });
};

User.methods.withoutPassword = function () {
  const user = this.toObject();
  
  delete user.password;
  return user;
};

module.exports = mongoose.model('User', User);
