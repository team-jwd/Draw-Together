const User = require('./../../server/models/user-model');
const userController = require('./../../server/controllers/user-controller');
const { expect } = require('chai');

describe('create user', () => {
  it('adds user to database', (done) => {
    userController.createUser({
      username: 'jc',
      password: 'boardroom',
      firstname: 'jiaxi',
      lastname: 'zhang',
    }, (err, usr) => {
      User.findOne({ username: 'jc', password: 'boardroom' }, (err, data) => {
        expect({ username: data.username, password: data.password }).to.eql({
          username: 'jc',
          password: 'boardroom',
        });

        done();
      });
    });
  });
});
