import React from 'react';
import Message from './Message.jsx';

export default (props) => {
  const messages = props.messages.map((message, i) =>
    <Message key={i} message={message} />);
  return (
    <div id="chat-window">
      {messages}
    </div>
  );
};

