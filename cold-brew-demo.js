const coldBrew = require('cold-brew');

const { until, By, Key } = require('selenium-webdriver');

const User = require('./server/models/user-model');
const Room = require('./server/models/room-model');
const app = require('./server/index');

const ADDRESS = 'localhost:7000/';

describe('app', function () {
  let client1, client2;

  before(function (done) {
    User.remove({}, function (err) {
      if (err) throw err;
      Room.remove({}, function (error) {
        if (error) throw error;
        client1 = coldBrew.createClient()
        client2 = coldBrew.createClient()
        done()
      })
    })
  })

  it('should be able to navigate both clients to the chatroom', function (done) {
    this.timeout(30000);
    
    client1.get(ADDRESS)
    client2.get(ADDRESS)

    client1.do([
      ['click', 'button.signup-btn'],
      ['sendKeys', 'input#firstName', {}, 'Daniel'],
      ['sendKeys', 'input#lastName', {}, 'King'],
      ['sendKeys', 'input#username', {}, 'dking1286'],
      ['sendKeys', 'input#email', {}, 'daniel.oliver.king@gmail.com'],
      ['sendKeys', 'input#password', {}, 'helloworld'],
      ['click', '#signup-form button']
    ])

    client1.wait(until.elementLocated(By.css('#profile-card')))
    
    client1.do([
      ['click', 'button.signup-btn'],
      ['sendKeys', '.createroomname', {}, 'testroom'],
      ['sendKeys', '.createroompassword', {}, 'password'],
      ['click', '#create-form button']
    ])

    client2.do([
      ['click', 'button.signup-btn'],
      ['sendKeys', 'input#firstName', {}, 'Daniel'],
      ['sendKeys', 'input#lastName', {}, 'Schming'],
      ['sendKeys', 'input#username', {}, 'dking1287'],
      ['sendKeys', 'input#email', {}, 'daniel.oliver.schming@gmail.com'],
      ['sendKeys', 'input#password', {}, 'helloscmorld'],
      ['click', '#signup-form button']
    ])

    client2.wait(until.elementLocated(By.css('#profile-card')))

    client2.do([
      ['click', 'button.login-btn'],
      ['sendKeys', '.joinroomname', {}, 'testroom'],
      ['sendKeys', '.joinroompassword', {}, 'password'],
      ['click', '#join-form button']
    ])

    client2.wait(until.elementLocated(By.css('canvas')))
      .then(() => done())
  })

  it('client2 should send an offer to client1', function (done) {
    client2.waitUntilSendSignaling(['offer'])
      .then(() => done());
  })

  it('client1 should receive offer', function (done) {
    client1.waitUntilReceiveSignaling(['offer'])
      .then(() => done())
  })

  it('client1 should send answer', function (done) {
    client1.waitUntilSendSignaling(['answer'])
      .then(() => done())
  })

  it('client2 should receive answer', function (done) {
    client2.waitUntilReceiveSignaling(['answer'])
      .then(() => done())
  })

  it('client1 should send and receive ICE candidates', function (done) {
    client1.waitUntilSendSignaling(['remote_candidate'])
    client1.waitUntilReceiveSignaling(['remote_candidate'])
      .then(() => done())
  })

  it('client2 should send and receive ICE candidates', function (done) {
    client2.waitUntilSendSignaling(['remote_candidate'])
    client2.waitUntilReceiveSignaling(['remote_candidate'])
      .then(() => done())
  })

  it('client1 RTCPeerConnection should be affected by signaling', function (done) {
    client1.waitUntilRTCEvents(['signalingstatechange'])
      .then(() => done())
  })

  it('client2 RTCPeerConnection should be affected by signaling', function (done) {
    client2.waitUntilRTCEvents(['signalingstatechange'])
      .then(() => done())
  })

  it('client1 should receive a datachannel opened by client2', function (done) {
    client1.waitUntilRTCEvents(['datachannel'])
      .then(() => done())
  })

  it('client1 should receive a video stream from client2', function (done) {
    client1.waitUntilRTCEvents(['addstream'])
      .then(() => done())
  })

  
})

