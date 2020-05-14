const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  count: {
    type: Number,
    default: 1
  }
});

const User = mongoose.model('User', UserSchema, 'user');

module.exports = User;
