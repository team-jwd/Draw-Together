const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('mongoose connected to server');
});

const userSchema = mongoose.Schema({
  username: String,
  password: String,
});

const User = mongoose.model('Kitten', userSchema);

const jc = new User({
  username: 'Jc',
  password: 'boardroom',
});

jc.save(function (err, jc) {
  if (err) console.log('error saving')
  console.log(jc);
});
