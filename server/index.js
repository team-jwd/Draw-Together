// const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { createSignalingChannel } = require('./signaling.js');


// const config = require('./config/config.js');

let PORT = process.env.PORT || 8080;

if (process.env.NODE_ENV === 'test') PORT = 7000;

const userController = require('./controllers/user-controller');
const roomController = require('./controllers/room-controller');

let dbPath;
if (process.env.DATABASE_LOCATION) {
  dbPath = process.env.DATABASE_LOCATION;
} else if (process.env.NODE_ENV === 'test') {
  dbPath = 'mongodb://jc:zhang@ds139715.mlab.com:39715/draw-together-test';
} else {
  dbPath = 'mongodb://dking:helloworld@ds061325.mlab.com:61325/draw-together-development';
}

if (!mongoose.connection.host) mongoose.connect(dbPath);

const db = mongoose.connection;

// For testing purposes, this promise will be
// exported so that we can avoid making requests
// to the database before it is open.
const dbOpen = new Promise((resolve, reject) => {
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    console.log('mongoose connected to server');
    resolve();
  });
});

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// const options = {
//   key: fs.readFileSync(path.join(`${__dirname}/config/server.key`), 'utf-8'),
//   cert: fs.readFileSync(path.join(`${__dirname}/config/server.crt`), 'utf-8'),
//   passphrase: 'boardroom',
// };

// const server = https.createServer(options, app);
const server = http.createServer(app);

const io = require('socket.io')(server);


app.use((req, res, next) => {
  req.locals = {};
  next();
});

createSignalingChannel(io);


app.post('/signup',
  userController.createUser,
  userController.createJWT,
  (req, res) => {
    res.send(req.locals);
  }
);

app.post('/login',
  userController.verifyUser,
  userController.createJWT,
  (req, res) => {
    res.send(req.locals);
  }
);

app.post('/create',
  roomController.createRoom,
  (req, res) => {
    res.send(req.locals);
  }
);

app.post('/join',
  roomController.verifyRoom,
  (req, res) => {
    res.send(req.locals);
  }
);


io.on('connection', (socket) => {
  socket.on('save message', (msgData) => {
    roomController.saveMessage(msgData);
  });

  socket.on('get messages', (roomName) => {
    roomController.getMessages(roomName)
      .then((messages) => {
        socket.emit('messages', { messages });
      });
  });

  socket.on('disconnect', () => {
  });
});

server.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});

app.use(express.static(path.join(`${__dirname}/..`)));

app.get('/', (req, res) => {
  res.sendFile(path.join(`${__dirname}/../index.html`));
});

module.exports = { app, db, dbOpen };
