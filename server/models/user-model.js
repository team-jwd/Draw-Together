const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const SALT_WORK_FACTOR = 10;

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});

userSchema.pre('save', function encrypt(next) {
  const user = this;
  bcrypt.hash(user.password, SALT_WORK_FACTOR, (err, hash) => {
    if (err) throw err;
    user.password = hash;
    next();
  });
});

// For testing purposes, we need to not overwrite then
// model if it has already been created.
let User;
try {
  User = mongoose.model('users');
} catch (error) {
  // Model does not exist yet, create it.
  User = mongoose.model('users', userSchema);
}
module.exports = User;
