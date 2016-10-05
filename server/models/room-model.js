const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  name: String,
  password: String,
  messages: [],
});

const Room = mongoose.model('User', roomSchema);
module.exports = Room;
