const request = require('supertest');
const expect = require('chai').expect;

const { app } = require('../../server/index');
const User = require('../../server/models/user-model')

describe('Server routes', () => {
  describe('GET /', () => {
    it('should return html', (done) => {
      request(app)
        .get('/')
        .expect('Content-Type', /html/)
        .expect(200, done)
    });
  });

  describe('POST /signup', () => {
    beforeEach((done) => {
      User.remove({})
        .then(() => done());
    });

    it('should return an object with a user property', (done) => {
      const user = {
        username: 'dking',
        password: 'helloworld',
        firstName: 'Daniel',
        lastName: 'King',
      }

      request(app)
        .post('/signup')
        .send(user)
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, response) => {
          if (err) done(err);

          const { username, firstName, lastName } = response.body.user
          expect(username).to.equal('dking');
          expect(firstName).to.equal('Daniel');
          expect(lastName).to.equal('King');
          done();
        });
    });

    it('should respond with an error if the user already exists', (done) => {
      const user = {
        username: 'dking',
        password: 'helloworld',
        firstName: 'Daniel',
        lastName: 'King',
      }
      User.create(user)
        .then((userRecord) => {
          request(app)
            .post('/signup')
            .expect('user already exists', done);
        });
    });
  });

  describe('POST /login', () => {
    beforeEach((done) => {
      User.remove({})
        .then(() => done());
    });

    it('should send back the user data if the user is in the database', (done) => {
      const userdata = {
        username: 'dking',
        password: 'helloworld',
        firstName: 'Daniel',
        lastName: 'King'
      }

      User.create(userdata).then((user) => {
        request(app)
          .post('/login')
          .send(userdata)
          .expect(200)
          .end((err, response) => {
            if (err) done(err);

            const { username, firstName, lastName } = response.body.user

            expect(username).to.equal('dking');
            expect(firstName).to.equal('Daniel');
            expect(lastName).to.equal('King');
            done();
          });
        });
    });

    it('should send an error if the user does not exist', (done) => {
      const userdata = {
        username: 'dking',
        password: 'helloworld',
        firstName: 'Daniel',
        lastName: 'King'
      }
      request(app)
        .post('/login')
        .send(userdata)
        .expect(400, done);
    })

    it('should send an error if the user exists but enters the wrong password', (done) => {
      const userdata = {
        username: 'dking',
        password: 'helloworld',
        firstName: 'Daniel',
        lastName: 'King'
      }

      User.create(userdata).then((userRecord) => {
        request(app)
          .post('/login')
          .send({
            username: 'dking',
            password: 'this is incorrect',
          })
          .expect(400, done);
      });
    });
  });
});
