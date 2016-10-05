const User = require('./../models/user-model.js');

const userController = {};

userController.createUser = (user, callback) => {
  User.create({
    username: user.username,
    password: user.password,
    firstName: user.firstname,
    lastName: user.lastname,
  },
    (err, usr) => {
      if (err) throw err;
      callback(err, usr);
    }
  );
};


// add bcrypt
userController.verifyUser = (user) => {
  User.findOne({ username: user.username, password: user.password },
    (err, usr) => {
      if (err) return console.log(err);
      return usr;
    }
  );
};

module.exports = userController;

