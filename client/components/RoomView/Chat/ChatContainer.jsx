import React from 'react';
import ChatForm from './ChatForm.jsx';
import ChatWindow from './ChatWindow.jsx';

import RTC from './../../../rtc-controller.js';
import socket from './../../../socket.js';
import store from './../../../store.js';

export default class ChatContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      channel: null,
      messages: ['hey'],
    };
    this.handleMessageSubmit = this.handleMessageSubmit.bind(this);
  }

  handleMessageSubmit(message) {
    const { messages } = this.state;
    messages.push(message);
    this.setState({ messages });
    this.props.sendMessage(message);
  }

  render() {
    return (
      <div>
        <ChatWindow messages={this.state.messages} />
        <ChatForm submit={this.handleMessageSubmit} />
      </div>
    );
  }
}
