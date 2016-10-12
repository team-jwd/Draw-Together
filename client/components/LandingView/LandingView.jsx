import React, { Component } from 'react';
import jwtDecode from 'jwt-decode';
import Axios from 'axios';
import CreateRoomButton from './CreateRoomButton.jsx';
import EnterRoomForm from './EnterRoomForm.jsx';
import JoinRoomButton from './JoinRoomButton.jsx';
import NavigationContainer from '../Navigation/NavigationContainer.jsx';

import socket from '../../socket';
import RTC from '../../rtc-controller';
import store from './../../store.js';
import actions from './../../actions.js';


export default class LandingView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      joinRoomFormVisible: false,
      createRoomFormVisible: false,
      createRoomPassword: '',
      createRoomName: '',
      joinRoomPassword: '',
      joinRoomName: '',
    };
    this.showForm = this.showForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleJoinRoomSubmit = this.handleJoinRoomSubmit.bind(this);
    this.handleCreateRoomSubmit = this.handleCreateRoomSubmit.bind(this);
  }

  componentWillMount() {
    const token = localStorage.getItem('token');
    if (token) {
      const userData = store.getState().get('userData');
      if (store.getState().get('room')) {
        store.dispatch(actions.leaveRoom());
      }
      if (!userData) {
        const { username, firstName, lastName } = jwtDecode(token);
        store.dispatch(actions.login(username, firstName, lastName));
      }
    } else {
      store.dispatch(actions.logout());
      this.props.history.push('/');
    }
  }

  handleJoinRoomSubmit() {
    Axios.post('/join', {
      roomName: this.state.joinRoomName,
      password: this.state.joinRoomPassword,
    }).then((response) => {
      const roomName = response.data.room.roomName;
      socket.emit('join_room', roomName, (res) => {
        if (res === 'full') {
          // room is full
        } else {
          if (res === 2) RTC.isInitiator = true;
          store.dispatch(actions.joinRoom(roomName));
          this.props.history.push('/room');
        }
      });
    }).catch((err) => {
      if (err) throw err;
    });
  }

  handleCreateRoomSubmit() {
    Axios.post('/create', {
      roomName: this.state.createRoomName,
      password: this.state.createRoomPassword,
    }).then((response) => {
      const roomName = response.data.room.roomName;
      socket.emit('create_room', roomName, (respond) => {
        if (respond !== 'exists') {
          store.dispatch(actions.joinRoom(roomName));
          this.props.history.push('/room');
        }
      });
    }).catch((err) => {
      if (err) throw err;
    });
  }

  showForm(e) {
    const joinRoomFormVisibility = e.target.value === 'create';
    this.setState({
      joinRoomFormVisible: !joinRoomFormVisibility,
      createRoomFormVisible: joinRoomFormVisibility,
    });
  }

  handleChange(e) {
    const obj = {};
    obj[e.target.name] = e.target.value;
    this.setState(obj);
  }

  render() {
    return (
      <div className="landing-view">
        <NavigationContainer history={this.props.history} />
        <p>Landing View Page</p>
        <CreateRoomButton
          onClick={this.showForm}
        />
        <EnterRoomForm
          type="Create"
          display={this.state.createRoomFormVisible ? 'block' : 'none'}
          handleRoomNameChange={this.handleChange}
          handlePasswordChange={this.handleChange}
          onSubmit={this.handleCreateRoomSubmit}
        />
        <JoinRoomButton
          onClick={this.showForm}
        />
        <EnterRoomForm
          type="Join"
          display={this.state.joinRoomFormVisible ? 'block' : 'none'}
          handleRoomNameChange={this.handleChange}
          handlePasswordChange={this.handleChange}
          onSubmit={this.handleJoinRoomSubmit}
        />
      </div>
    );
  }
}
