import React, { Component } from 'react';
import jwtDecode from 'jwt-decode';
import { connect } from 'react-redux';
import Axios from 'axios';
import ShowFormButton from './ShowFormButton.jsx';
import EnterRoomForm from './EnterRoomForm.jsx';
import NavigationContainer from '../Navigation/NavigationContainer.jsx';
import ProfileCard from './ProfileCard.jsx';
import Card from './card.jsx';

import socket from '../../socket';
import RTC from '../../rtc-controller';
import store from './../../store.js';
import actions from './../../actions.js';

/* eslint jsx-a11y/no-static-element-interactions: 0 */

class LandingView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      joinRoomFormVisible: false,
      createRoomFormVisible: false,
      createRoomPassword: '',
      createRoomName: '',
      joinRoomPassword: '',
      joinRoomName: '',
      joinErrorVisible: false,
      createErrorVisible: false,
    };
    this.showForm = this.showForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleJoinRoomSubmit = this.handleJoinRoomSubmit.bind(this);
    this.handleCreateRoomSubmit = this.handleCreateRoomSubmit.bind(this);
    this.removeForm = this.removeForm.bind(this);
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
    }).catch(() => {
      this.setState({ joinErrorVisible: true });
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
    }).catch(() => {
      this.setState({ createErrorVisible: true });
    });
  }

  showForm(e) {
    const joinRoomFormVisibility = e.target.value === 'create';
    document.getElementsByClassName('landing-view')[0].style.opacity = '0.3';
    this.setState({
      joinRoomFormVisible: !joinRoomFormVisibility,
      createRoomFormVisible: joinRoomFormVisibility,
    });
    const form = document.getElementById(`${e.target.value}-form`).style;
    form.position = 'fixed';
    form.zIndex = 1000;
    form.height = '225px';
    form.width = '375px';
    form.margin = 'auto';
    form.top = '0';
    form.bottom = '0';
    form.left = '0';
    form.right = '0';
    form.opacity = '1';
  }

  handleChange(e) {
    const obj = {};
    obj[e.target.name] = e.target.value;
    this.setState(obj);
  }

  removeForm() {
    if (this.state.joinRoomFormVisible || this.state.createRoomFormVisible) {
      this.setState({
        joinRoomFormVisible: false,
        createRoomFormVisible: false,
        joinErrorVisible: false,
        createErrorVisible: false,
        createRoomPassword: '',
        createRoomName: '',
        joinRoomPassword: '',
        joinRoomName: '',
      });
      document.getElementsByClassName('landing-view')[0].style.opacity = '1';
    }
  }

  render() {
    return (
      <div id="landing-view">
        <div className="popup">
          <EnterRoomForm
            type="Create"
            description="Create a room by filling out the form below"
            display={this.state.createRoomFormVisible ? 'block' : 'none'}
            handleRoomNameChange={this.handleChange}
            handlePasswordChange={this.handleChange}
            onSubmit={this.handleCreateRoomSubmit}
            errorDisplay={this.state.createErrorVisible ? 'block' : 'none'}
            error="This room name is already taken"
          />
          <EnterRoomForm
            type="Join"
            description="Join a room by filling out the form below"
            display={this.state.joinRoomFormVisible ? 'block' : 'none'}
            handleRoomNameChange={this.handleChange}
            handlePasswordChange={this.handleChange}
            onSubmit={this.handleJoinRoomSubmit}
            errorDisplay={this.state.joinErrorVisible ? 'block' : 'none'}
            error="The room name or password is incorrect"
          />
        </div>
        <main className="landing-view" onClick={this.removeForm}>
          <NavigationContainer history={this.props.history} />
          <div id="landing-view">
            <div className="cards">
              <ProfileCard
                firstName={this.props.firstName}
                lastName={this.props.lastName}
                username={this.props.username}
              />
              <Card
                title="Start a Live Video Chat"
                description={`It only takes a second to set up a new room for 
                you and your collaborator. Click on the create room button, 
                give a user name and optional password and its made. Then 
                just send the room info to your partner`}
              />
              <Card
                title="Join a Previously Created Room"
                description={`Click on join a room and enter your old room name 
                  and password. You will be dropped back in right where you left
                   off. All of your whiteboarding and messages will still be in
                   that room`}
              />
            </div>
            <div>
              <h2 id="button-descriptions">{`Join or Create a Room to 
                Collaborate on Your Project`}
              </h2>
            </div>
            <div className="buttons">
              <ShowFormButton
                type="Create"
                onClick={this.showForm}
              />
              <ShowFormButton
                onClick={this.showForm}
                type="Join"
              />
            </div>
          </div>
        </main>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    username: state.getIn(['userData', 'username']),
    firstName: state.getIn(['userData', 'firstName']),
    lastName: state.getIn(['userData', 'lastName']),
  };
}

export default connect(mapStateToProps)(LandingView);
