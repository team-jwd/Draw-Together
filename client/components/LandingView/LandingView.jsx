import React, { Component } from 'react';
import CreateRoomButton from './CreateRoomButton.jsx';
import CreateRoomForm from './CreateRoomForm.jsx';
import JoinRoomButton from './JoinRoomButton.jsx';
import JoinRoomForm from './JoinRoomForm.jsx';

export default class LandingView extends Component {
  constructor(props) {
    super(props);
    this.state = { test: true };
  }
  onClick() {
    this.state = { test: false };
  }
  render() {
    return (
      <div>
        <p>Landing View Page</p>
        <CreateRoomButton update={this.onClick.bind(this)} />
        <CreateRoomForm />
        <JoinRoomButton />
        <JoinRoomForm />

      </div>
    );
  }
}
