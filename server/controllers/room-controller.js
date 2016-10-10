const Promise = require('bluebird');
const Room = Promise.promisifyAll(require('./../models/room-model.js'));
const bcrypt = require('bcryptjs');

const roomController = {
  getAllRooms: (next) => {
    Room.find({}, next);
  },
  createRoom: (req, res, next) => {
    const newRoom = new Room({
      roomName: req.body.roomName,
      password: req.body.password,
    });
    newRoom.save((error) => {
      if (error) {
        res.send('room already exists');
      } else {
        req.locals.room = {
          roomName: req.body.roomName,
        };
        next();
      }
    });
  },
  verifyRoom: (req, res, next) => {
    const { roomName, password } = req.body;
    Room.findOne({ roomName }, (error, room) => {
      if (error) throw error;
      if (room) {
        bcrypt.compare(password, room.password, function comparePasswords(err, bool) {
          if (err) throw err;
          if (bool) {
            req.locals.room = {
              roomName: room.roomName,
            };
            next();
          } else {
            res.send('incorrect password');
          }
        });
      } else {
        res.send('Roomname or Password is incorrect!');
      }
    });
  },
  saveMessage: (msgData) => {
    const roomName = msgData.room;
    const msgInfo = {};
    const message = JSON.parse(msgData.messageInfo);
    msgInfo.username = message.username;
    msgInfo.message = message.message;
    Room.findOneAndUpdate(
      { roomName },
      { $push: { messages: JSON.stringify(msgInfo) } },
      (error) => {
        if (error) throw error;
      }
    );
  },
  getMessages: (room) => {
    const roomName = room.roomName;
    return Room.findOne({ roomName }).then(found => found.messages);
  },
};

module.exports = roomController;
