const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const SALT_WORK_FACTOR = 10;

const roomSchema = new mongoose.Schema({
  roomName: { type: String, required: true, unique: true },
  password: String,
  messages: [],
  canvas: '',
});

roomSchema.pre('save', function encrypt(next) {
  const room = this;
  bcrypt.hash(room.password, SALT_WORK_FACTOR, (err, hash) => {
    if (err) throw err;
    room.password = hash;
    next();
  });
});

const Room = mongoose.model('Room', roomSchema);
module.exports = Room;
