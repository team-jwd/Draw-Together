const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:80/test');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('mongoose connected to server');
});
