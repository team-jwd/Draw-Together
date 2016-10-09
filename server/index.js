//const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { createSignalingChannel } = require('./signaling.js');


//const config = require('./config/config.js');

const port = process.env.PORT || 8080;

const userController = require('./controllers/user-controller');

const app = express();
console.log(process.env.DATABASE_LOCATION);
mongoose.connect(process.env.DATABASE_LOCATION);
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('mongoose connected to server');
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// const options = {
//   key: fs.readFileSync(path.join(`${__dirname}/config/server.key`), 'utf-8'),
//   cert: fs.readFileSync(path.join(`${__dirname}/config/server.crt`), 'utf-8'),
//   passphrase: 'boardroom',
// };

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


io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('a user disconnected');
  });
});

server.listen(3000, () => {
  console.log('listening on 3k');
});

app.use(express.static(path.join(`${__dirname}/..`)));

app.get('/', (req, res) => {
  res.sendFile(path.join(`${__dirname}/../index.html`));
});
