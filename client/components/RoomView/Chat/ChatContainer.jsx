import React from 'react';
import ChatForm from './ChatForm.jsx';
import ChatWindow from './ChatWindow.jsx';

export default props =>
  <div>
    <ChatWindow messages={props.messages || []} />
    <ChatForm
      onChatMessageSubmit={props.onChatMessageSubmit}
    />
  </div>;
