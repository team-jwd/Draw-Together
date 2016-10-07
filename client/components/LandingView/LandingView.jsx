import React, { Component } from 'react';
import jwtDecode from 'jwt-decode';
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

  componentWillMount() {
    const token = localStorage.getItem('token');
    console.log(jwtDecode(token));
  }

  onClick() {
    this.state = { test: false };
  }

  joinRoom(roomName, password) {
    // console.log('called joinRoom()');
    // socket.on('joined_room', (roomName) => {
    //   console.log('joined room', roomName);
    // });

    socket.emit('join_room', roomName, (response) => {
      console.log('received response from server, response:', response);
      if (response === 'full') {
        // Choose another name
      } else {
        if (response === 2) RTC.isInitiator = true;
        store.dispatch(actions.joinRoom(roomName));
        this.props.history.push('/room');
      }
    });
  }

  render() {
    return (
      <div>
        <p>Landing View Page</p>
        <CreateRoomButton update={this.onClick.bind(this)} />
        <CreateRoomForm />
        <JoinRoomButton />
        <JoinRoomForm onSubmit={this.joinRoom.bind(this)} />
      </div>
    );
  }
}
