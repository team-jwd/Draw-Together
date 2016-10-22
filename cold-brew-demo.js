const coldBrew = require('cold-brew');
const { until, By } = require('selenium-webdriver');

const app = require('./server/index');

const ngrok = require('ngrok');

const roomName = Math.floor(Math.random() * 10000);

const client1 = coldBrew.createClient();
const client2 = coldBrew.createClient();

let ADDRESS = 'http://localhost:7000';

describe('ColdBrew', function () {
  // before(function (done) {
  //   this.timeout(10000);

  //   // ngrok.connect(7000, (err, url) => {
  //   //   ADDRESS = url;
  //   //   done();
  //   // });
  // });

  it('should be able to navigate to the chat room', function (done) {
    this.timeout(30000);
    
    client1.get(ADDRESS);
    client2.get(ADDRESS);

    toLandingView(client1);
    createRoom(client1);

    toLandingView(client2);
    joinRoom(client2);

    client2.wait(until.elementLocated(By.css('canvas')))
      .then((located) => { if (located) done() });
  });

  it('should be able to detect ICE candidate signaling', function (done) {
    this.timeout(30000);

    client1.waitUntilRTCEvents('icecandidate');
    client2.waitUntilRTCEvents('icecandidate')
      .then((occurred) => { if (occurred) done() });
  });

  it('should be able to detect SDP signaling', function (done) {
    this.timeout(30000);

    client1.waitUntilRTCEvents('signalingstatechange');
    client2.waitUntilRTCEvents('signalingstatechange')
      .then((occurred) => { if (occurred) done() });
  });

  it('should detect that a datachannel was established', function (done) {
    this.timeout(30000);

    client1.waitUntilRTCEvents('datachannel')
      .then((occurred) => { if (occurred) done() });
  });

  it('should detect that a video stream was established', function (done) {
    this.timeout(30000);

    client1.waitUntilRTCEvents('addstream')
      .then((occurred) => { if (occurred) done() });
  });
});

function toLandingView(client) {
  client.get('http://localhost:7000');
  client.do([
    ['click', '.login-btn', { innerText: 'Login' }],
    ['sendKeys', '#login-user', {}, 'dking'],
    ['sendKeys', '#login-password', {}, 'helloworld'],
    ['click', '#login-form button'],
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
