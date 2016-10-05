const mongoose = require('mongoose');
const db = require('./db');

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  firstName: String,
  lastName: String,
});

const User = mongoose.model('User', userSchema);
module.exports = User;
