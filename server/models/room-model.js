const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const SALT_WORK_FACTOR = 10;

const roomSchema = new mongoose.Schema({
  roomName: { type: String, required: true, unique: true },
  password: String,
  messages: [],
  canvas: Buffer,
  createdAt: { type: Date, expires: 60 * 60 * 24 * 3, default: Date.now },
});

roomSchema.pre('save', function encrypt(next) {
  const room = this;
  bcrypt.hash(room.password, SALT_WORK_FACTOR, (err, hash) => {
    if (err) throw err;
    room.password = hash;
    next();
  });
});

// For testing purposes, we need to not overwrite then
// model if it has already been created.
let Room;
try {
  Room = mongoose.model('rooms');
} catch (error) {
  // Model does not exist yet, create it.
  Room = mongoose.model('rooms', roomSchema);
}
module.exports = Room;
