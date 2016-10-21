const coldBrew = require('cold-brew');
const { until, By } = require('selenium-webdriver');

const app = require('../../../server/index');

const roomName = Math.floor(Math.random() * 10000)


const client1 = coldBrew.createClient();
const client2 = coldBrew.createClient();

describe('Room view RTC connection', function() {
  it('should signal to the other client', function(done) {
    this.timeout(10000);

    toLandingView(client1);
    createRoom(client1);
    toLandingView(client2);
    joinRoom(client2);

    client1.waitUntilRTCEvents('signalingstatechange').then((occurred) => {
      if (occurred) done();
    });
  });

  after((done) => {
    client1.quit();
    client2.quit().then(done);
  });
});

function toLandingView(client) {
  client.get('http://localhost:7000');
  client.do([
    ['click', '.login-btn', { innerText: 'Login' }],
    ['sendKeys', '.login-form input', { placeholder: 'username' }, 'dking'],
    ['sendKeys', '.login-form input', { placeholder: 'password' }, 'helloworld'],
    ['click', '.login-form button'],
  ]);
}

function createRoom(client) {
  client.wait(until.elementLocated({ className: 'landing-view' }));
  client.do([
    ['click', 'div button', { innerText: 'Create a Room' }],
    ['sendKeys', 'input', { name: 'createRoomName' }, roomName],
    ['sendKeys', 'input', { name: 'createRoomPassword' }, 'password'],
    ['click', '#create-form button'],
  ]);
}

function joinRoom(client) {
  client.wait(until.elementLocated({ className: 'landing-view' }));
  client.do([
    ['click', 'button', { innerText: 'Join a Room' }],
    ['sendKeys', 'input', { name: 'joinRoomName' }, roomName],
    ['sendKeys', 'input', { name: 'joinRoomPassword' }, 'password'],
    ['click', '#join-form button'],
  ]);
}
