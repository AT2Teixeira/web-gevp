const mongoose = require('../database');
const bcrypt = require('bcryptjs');

const Verify_UserSchema = new mongoose.Schema({
  id_user: {
    type: String,
    required: true,
    unique: true
  },
  dados: {
    type: String,
    required: true
  },
  passwordResetToken: {
    type: String,
    required: true,
    select: false
  },
  passwordResetExpires: {
    type: Date,
    required: true,
    select: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Verify_User = mongoose.model('Verify_User', Verify_UserSchema);

module.exports = Verify_User;