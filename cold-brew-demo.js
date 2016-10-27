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

  it('should be able to establish an RTCPeerConnection', function (done) {
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

    client1.waitUntilRTCEvents(['signalingstatechange', 'datachannel'])
      .then((occurred) => {
        if (occurred) {
          done()
        }
      })  
  })
})