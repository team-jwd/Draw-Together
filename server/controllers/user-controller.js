const User = require('./../models/user-model.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const config = require('../config/config.js');

const userController = {
  getAllUsers: (next) => {
    User.find({}, next);
  },
  createUser: (req, res, next) => {
    const newUser = new User({
      username: req.body.username,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    });
    newUser.save((error) => {
      if (error) {
        res.send('user already exists');
      } else {
        req.locals.user = {
          username: req.body.username,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
        };
        next();
      }
    });
  },
  verifyUser: (req, res, next) => {
    const { username, password } = req.body;
    User.findOne({ username }, (error, user) => {
      if (error) throw error;
      if (user) {
        bcrypt.compare(password, user.password, function comparePasswords(err, bool) {
          if (err) throw err;
          if (bool) {
            req.locals.user = {
              username: req.body.username,
              firstName: req.body.firstName,
              lastName: req.body.lastName,
            };
            console.log('passwords match');
            next();
          } else {
            console.log('password incorrect');
            res.send('incorrect password');
          }
        });
      }
    });
  },
  createJWT: (req, res, next) => {
    const user = req.locals.user;
    const cert = fs.readFileSync(path.join(`${__dirname}/../config/private.key`));
    const token = jwt.sign(user, cert, {
      algorithm: 'RS256',
    });
    req.locals.token = token;
    next();
  },
};

module.exports = userController;

