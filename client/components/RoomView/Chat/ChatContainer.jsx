import React from 'react';
import ChatForm from './ChatForm.jsx';
import ChatWindow from './ChatWindow.jsx';

export default class ChatContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
    };
  }

  handleMessageSubmit(message) {
    const { messages } = this.state;
    messages.unshift(message);
    this.setState({ messages });
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
