import React, { Component } from 'react';
import CreateRoomButton from './CreateRoomButton.jsx';
import CreateRoomForm from './CreateRoomForm.jsx';
import JoinRoomButton from './JoinRoomButton.jsx';
import JoinRoomForm from './JoinRoomForm.jsx';

import socket from '../../socket';
import RTC from '../../rtc-controller';
import store from './../../store.js';
import actions from './../../actions.js';

export default class LandingView extends Component {
  constructor(props) {
    super(props);
    this.state = { test: true };
  }

  joinRoom() {
    const roomName = prompt('Enter Room Name:');
    socket.emit('join_room', roomName, (response) => {
      console.log('received response from server, response:', response);
      if (response === 'full') {
        alert('Room full, please try again');
      } else if (response === 'empty') {
        alert('This room does not exist');
      } else {
        if (response === 2) RTC.isInitiator = true;
        store.dispatch(actions.joinRoom(roomName));
        this.props.history.push('/room');
      }
    });
  }

  createRoom() {
    const roomName = prompt('Enter Room Name:');
    socket.emit('create_room', roomName, (respond) => {
      console.log(respond);
      if (respond === 'exists') {
        alert('Please choose another name');
      } else {
        store.dispatch(actions.joinRoom(roomName));
        this.props.history.push('/room');
        console.log('joining room:', roomName);
      }
    });
  }

  render() {
    return (
      <div>
        <p>Landing View Page</p>
        <CreateRoomButton />
        <CreateRoomForm createRoom={this.createRoom.bind(this)} />
        <JoinRoomButton joinRoom={this.joinRoom.bind(this)} />
        <JoinRoomForm onSubmit={this.joinRoom.bind(this)} />
      </div>
    );
  }
}
