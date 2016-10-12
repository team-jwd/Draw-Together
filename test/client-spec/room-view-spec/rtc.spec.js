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

    client1.waitUntilRTCEvents('signalingstatechange')
      .then(eventOccurred => {if (eventOccurred) done()})
  });
});

function toLandingView(client) {
  client.get('http://localhost:7000');
  client.findElementByAttributes('.login-btn', {innerText: 'Login'}).click();
  client.findElementByAttributes('.login-form input', {placeholder: 'username'})
    .sendKeys('dking');
  client.findElementByAttributes('.login-form input', {placeholder: 'password'})
    .sendKeys('helloworld');
  client.findElementByAttributes('.login-form button').click();
}

function createRoom(client) {
  client.wait(until.elementLocated({className: 'landing-view'}));
  client.findElementByAttributes('div button', {innerText: 'Create Room'}).click();
  client.findElementByAttributes('input', {name: 'createRoomName'})
    .sendKeys(roomName);
  client.findElementByAttributes('input', {name: 'createRoomPassword'})
    .sendKeys('password')
  client.findElementByAttributes('#create-form button').click();
}

function joinRoom(client) {
  client.wait(until.elementLocated({className: 'landing-view'}));
  client.findElementByAttributes('button', {innerText: 'Join a room'}).click();
  client.findElementByAttributes('input', {name: 'joinRoomName'})
    .sendKeys(roomName);
  client.findElementByAttributes('input', {name: 'joinRoomPassword'})
    .sendKeys('password')
  client.findElementByAttributes('#join-form button').click();
}



// describe('RTC connection', () => {
//   it('should connect when both clients visit the page', function(done) {
//     this.timeout(5000);
//     toRoomView(client1);
//     toRoomView(client2);
//
//     client1.wait(client1.untilRTCEvents(['signalingstatechange']), 3000)
//       .then(done);
//   });
// });
//
// function toRoomView(browser) {
//   browser.get('http://localhost:8080')
//
//   findElementByAttributes(browser, 'button.login-btn', {innerText: 'Login'})
//     .click()
//   findElementByAttributes(browser,
//     '.login-form input',
//     {placeholder: 'username'}
//   )
//     .sendKeys('dking');
//   findElementByAttributes(browser,
//     '.login-form input',
//     {placeholder: 'password'}
//   )
//     .sendKeys('helloworld');
//   findElementByAttributes(browser, '.login-form button', {innerText: 'Log in!'})
//     .click();
//
//   browser.wait(until.elementLocated({id: 'joinRoomForm'}));
//
//   browser
//     .findElement({id: 'joinRoomForm'})
//     .findElement({tagName: 'button'})
//     .click();
// }
