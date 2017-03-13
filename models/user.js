const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt-nodejs');

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 4,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 4,
    maxlength: 12
  },
  sessions: [{
    token: {
      type: String,
      required: true
    },
    device: {
      type: String,
      required: true
    }
  }],
  role: {
    type: String,
    default: 'user',
    enum: ['admin', 'user']
  },
  active: {
    type: Boolean,
    default: false
  },
  firstname: {
    type: String,
    required: true,
    trim: true
  },
  lastname: {
    type: String,
    required: true,
    trim: true
  },
});

// generating a hash
UserSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};


module.exports = mongoose.model("User", UserSchema);