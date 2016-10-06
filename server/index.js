const https = require('https');
const fs = require('fs');
const path = require('path');
const express = require('express');
const User = require('./models/user-model');


const app = express();

const options = {
  key: fs.readFileSync(path.join(`${__dirname}/config/server.key`), 'utf-8'),
  cert: fs.readFileSync(path.join(`${__dirname}/config/server.crt`), 'utf-8'),
  passphrase: 'boardroom',
};

const server = https.createServer(options, app);

const io = require('socket.io')(server);


io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('login', (info, fn) => {
    console.log(info);
    fn(true);
  });

  socket.on('signup', (info, fn) => {
    console.log(info);
    fn(true);
  });

  socket.on('disconnect', () => {
    console.log('a user disconnected');
  });
});

server.listen(3000, () => {
  console.log('listnen on 3k');
});

app.use(express.static(path.join(`${__dirname}/..`)));

app.get('/:query', (req, res) => {
  const query = req.params.query;
  res.send(query);
});

