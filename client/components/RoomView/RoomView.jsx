import React from 'react';
import ChatContainer from './Chat/ChatContainer';
import CanvasContainer from './Canvas/CanvasContainer';
import VideoContainer from './Video/VideoContainer';

import store from '../../store';
import socket from '../../socket';

export default class RoomView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <CanvasContainer />
        <ChatContainer />
        <VideoContainer />
      </div>;
    );
  }
}
